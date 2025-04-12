import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, mean_absolute_error, confusion_matrix, ConfusionMatrixDisplay
import os
import joblib

# Global variables
model = None
fertiliser_days_model = None
encoders = {}
target_encoder = None

# Paths
dataset_path = "datasets/crop-predictor-with-fertilising-days.csv"
mapping_file_path = "models/crop_predictor_model_mapping.csv"
image_path = "models/metrics/"

def plot_metrics(y_crop_true, y_crop_pred, y_fert_true, y_fert_pred, feature_names, clf_importances, reg_importances):
    if (not os.path.exists(image_path)):
        os.makedirs(image_path)

    # Confusion Matrix
    cm = confusion_matrix(y_crop_true, y_crop_pred)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm)
    disp.plot(cmap='Blues', xticks_rotation='vertical')
    plt.title("Crop Prediction Confusion Matrix")
    plt.tight_layout()
    plt.savefig(os.path.join(image_path, "confusion_matrix.png"))

    # Feature Importance - Classifier
    plt.figure(figsize=(10, 5))
    plt.barh(feature_names, clf_importances)
    plt.xlabel("Importance")
    plt.title("Feature Importance (Crop Classifier)")
    plt.tight_layout()
    plt.savefig(os.path.join(image_path, "feature_importance_classifier.png"))

    # Feature Importance - Regressor
    plt.figure(figsize=(10, 5))
    plt.barh(feature_names, reg_importances, color='orange')
    plt.xlabel("Importance")
    plt.title("Feature Importance (Fertilisation Days Regressor)")
    plt.tight_layout()
    plt.savefig(os.path.join(image_path, "feature_importance_regressor.png"))

    # Fertilisation Days - Prediction vs Actual
    plt.figure(figsize=(6, 6))
    plt.scatter(y_fert_true, y_fert_pred, alpha=0.5)
    plt.plot([min(y_fert_true), max(y_fert_true)], [min(y_fert_true), max(y_fert_true)], 'r--')
    plt.xlabel("Actual Days")
    plt.ylabel("Predicted Days")
    plt.title("Fertilising Days: Actual vs Predicted")
    plt.tight_layout()
    plt.savefig(os.path.join(image_path, "fertilising_days_actual_vs_predicted.png"))


def train_model():
    print("crop_predictor: Training models...")
    global model, fertiliser_days_model, encoders, target_encoder

    data = pd.read_csv(dataset_path)
    target_col = "Crop Type"
    categorical_cols = ["Soil Type"]
    encoders = {}
    for col in categorical_cols:
        le = LabelEncoder()
        data[col] = le.fit_transform(data[col])
        encoders[col] = le

    target_encoder = LabelEncoder()
    data[target_col] = target_encoder.fit_transform(data[target_col])
    X = data.drop([target_col, "Fertilizer Name", "fertilise_once_in_days"], axis=1)
    y_crop = data[target_col]
    y_fert_days = data["fertilise_once_in_days"]

    model = RandomForestClassifier()
    model.fit(X, y_crop)
    y_crop_pred = model.predict(X)

    fertiliser_days_model = RandomForestRegressor()
    fertiliser_days_model.fit(X, y_fert_days)
    y_fert_days_pred = fertiliser_days_model.predict(X)

    crop_fert_map_raw = pd.read_csv(dataset_path)
    crop_fert_map = crop_fert_map_raw.groupby("Crop Type")["Fertilizer Name"].agg(lambda x: x.mode()[0]).to_dict()
    encoded_crop_fert_map = {target_encoder.transform([crop])[0]: fert for crop, fert in crop_fert_map.items()}
    encoders["crop_to_fert"] = encoded_crop_fert_map
    print("crop_predictor: Model training complete.")

    # Evaluation metrics
    acc = accuracy_score(y_crop, y_crop_pred)
    mae = mean_absolute_error(y_fert_days, y_fert_days_pred)

    print(f"Classification Accuracy: {acc:.4f}")
    print(f"Fertilising Days MAE: {mae:.2f}")

    plot_metrics(y_crop, y_crop_pred, y_fert_days, y_fert_days_pred, X.columns, model.feature_importances_, fertiliser_days_model.feature_importances_)

    print("crop_predictor: Model training complete.")


def save_model():
    print("crop_predictor: Saving models and encoders...")
    global model, fertiliser_days_model, encoders, target_encoder, mapping_file_path
    if not os.path.exists("models"):
        os.makedirs("models")
    mapping_data = [
        {"Model Name": "predictor_crop_model.pkl", "Description": "Random Forest model for crop prediction"},
        {"Model Name": "predictor_Soil Type_encoder.pkl", "Description": "Label encoder for Soil Type"},
        {"Model Name": "predictor_target_encoder.pkl", "Description": "Label encoder for target Crop Type"},
        {"Model Name": "predictor_crop_to_fert_mapping.pkl", "Description": "Mapping from crop label to fertilizer name"},
        {"Model Name": "fertiliser_days_model.pkl", "Description": "Random Forest model for predicting fertilisation frequency"},
    ]
    mapping_df = pd.DataFrame(mapping_data)
    mapping_df.to_csv(mapping_file_path, index=False)
    if model is None or encoders is None or target_encoder is None:
        raise Exception("crop_predictor: Model and encoders must be trained before saving.")
    joblib.dump(model, "models/predictor_crop_model.pkl")
    joblib.dump(fertiliser_days_model, "models/fertiliser_days_model.pkl")
    joblib.dump(encoders["Soil Type"], "models/predictor_Soil Type_encoder.pkl")
    joblib.dump(target_encoder, "models/predictor_target_encoder.pkl")
    joblib.dump(encoders["crop_to_fert"], "models/predictor_crop_to_fert_mapping.pkl")
    print("crop_predictor: Models and encoders saved.")


def predict_crop(input_data):
    global model, target_encoder
    prediction = model.predict(input_data)
    return target_encoder.inverse_transform(prediction)[0]


def predict_fertilising_days(input_data):
    global fertiliser_days_model
    return round(fertiliser_days_model.predict(input_data)[0])


def recommend_crops(input_data, top_n=3):
    probs = model.predict_proba(input_data)[0]
    top_indices = np.argsort(probs)[-top_n:][::-1]
    top_crops = target_encoder.inverse_transform(top_indices)
    top_probs = probs[top_indices]
    return list(zip(top_crops, top_probs))


def get_crop_recommendation(Temparature, Humidity, Moisture, Soil_Type, Nitrogen, Potassium, Phosphorous):
    if model is None or fertiliser_days_model is None:
        train_model()
    soil_encoded = encoders["Soil Type"].transform([Soil_Type])[0]
    input_data = np.array([[Temparature, Humidity, Moisture, soil_encoded, Nitrogen, Potassium, Phosphorous]])
    predicted_crop = predict_crop(input_data)
    recommendations = recommend_crops(input_data)
    days = predict_fertilising_days(input_data)
    crop_to_fert = encoders.get("crop_to_fert", {})
    encoded_crop = target_encoder.transform([predicted_crop])[0]
    recommended_fertilizer = crop_to_fert.get(encoded_crop, "Unknown")
    return {
        "predicted_crop": predicted_crop,
        "recommended_fertilizer": recommended_fertilizer,
        "fertilise_once_in_days": days,
        "recommendations": recommendations
    }


def get_top_crop_fertilizer_recommendations(Temparature, Humidity, Moisture, Soil_Type, Nitrogen, Potassium, Phosphorous, top_n=3):
    if model is None or target_encoder is None:
        train_model()
    soil_encoded = encoders["Soil Type"].transform([Soil_Type])[0]
    input_data = np.array([[Temparature, Humidity, Moisture, soil_encoded, Nitrogen, Potassium, Phosphorous]])
    recommendations = recommend_crops(input_data, top_n)
    crop_to_fert = encoders.get("crop_to_fert", {})
    enriched = []
    for crop, prob in recommendations:
        encoded_crop = target_encoder.transform([crop])[0]
        fert = crop_to_fert.get(encoded_crop, "Unknown")
        enriched.append({
            "crop": crop,
            "probability": round(prob, 4),
            "fertilizer": fert
        })
    return enriched


def get_fertilizer_for_crop(crop_name: str) -> str:
    if target_encoder is None or "crop_to_fert" not in encoders:
        raise Exception("Model or encoders not loaded. Please ensure training is done.")
    try:
        encoded_crop = target_encoder.transform([crop_name])[0]
    except ValueError:
        return "Crop not recognized"
    crop_to_fert = encoders["crop_to_fert"]
    return crop_to_fert.get(encoded_crop, "Unknown")


def load_data():
    global model, fertiliser_days_model, encoders, target_encoder, mapping_file_path
    if os.path.exists(mapping_file_path):
        print("crop_predictor: Loading models and encoders from mapping file...")
        mapping_df = pd.read_csv(mapping_file_path)
        for _, row in mapping_df.iterrows():
            model_name = row["Model Name"]
            full_path = f"models/{model_name}"
            if "crop_model" in model_name:
                model = joblib.load(full_path)
            elif "fertiliser_days_model" in model_name:
                fertiliser_days_model = joblib.load(full_path)
            elif "Soil Type_encoder" in model_name:
                encoders["Soil Type"] = joblib.load(full_path)
            elif "target_encoder" in model_name:
                target_encoder = joblib.load(full_path)
            elif "crop_to_fert_mapping" in model_name:
                encoders["crop_to_fert"] = joblib.load(full_path)
            else:
                print(f"Unknown model or encoder: {model_name}")
        if model is None or fertiliser_days_model is None or encoders is None or target_encoder is None:
            print("crop_predictor: Some models or encoders are missing. Training a new model...")
            train_model()
            save_model()
    else:
        print("crop_predictor: Mapping file not found. Training a new model...")
        train_model()
        save_model()


def get_crop_and_fertilizer(Temparature, Humidity, Moisture, Soil_Type, Nitrogen, Potassium, Phosphorous):
    if model is None or fertiliser_days_model is None:
        train_model()
    soil_encoded = encoders["Soil Type"].transform([Soil_Type])[0]
    input_data = np.array([[Temparature, Humidity, Moisture, soil_encoded, Nitrogen, Potassium, Phosphorous]])
    predicted_crop = predict_crop(input_data)
    crop_to_fert = encoders.get("crop_to_fert", {})
    encoded_crop = target_encoder.transform([predicted_crop])[0]
    recommended_fertilizer = crop_to_fert.get(encoded_crop, "Unknown")
    days = predict_fertilising_days(input_data)
    return {
        "predicted_crop": predicted_crop,
        "recommended_fertilizer": recommended_fertilizer,
        "fertilise_once_in_days": days
    }


def main():
    load_data()
    result = get_crop_recommendation(100.0, 0.0, 33.0, "Sandy", 100, 60, 0)
    print(result)


if __name__ == "__main__":
    main()
