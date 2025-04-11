import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import numpy as np
import os
import joblib
model = None
le = None
dataset_path = "datasets/vegetable-prices.csv"
mapping_file = "models/price_predictor_model_mapping.csv"
def load_data():
    global model, le, mapping_file
    if os.path.exists(mapping_file):
        print("price_predictor: Loading model and label encoder from mapping file...")
        mapping_df = pd.read_csv(mapping_file)
        row = mapping_df[mapping_df["model_name"] == "vegetable_price_model"]
        if not row.empty:
            model_path = row.iloc[0]["model_path"]
            le_path = row.iloc[0]["label_encoder_path"]
            if os.path.exists(model_path) and os.path.exists(le_path):
                model = joblib.load(model_path)
                le = joblib.load(le_path)
            else:
                print("price_predictor: Model or LabelEncoder file not found. Training a new model...")
                df = pre_processing()
                train_model(df)
                save_model()
        else:
            print("price_predictor: No mapping found for vegetable_price_model. Training a new model...")
            df = pre_processing()
            train_model(df)
            save_model()
    else:
        print("price_predictor: Mapping file not found. Training a new model...")
        df = pre_processing()
        train_model(df)
        save_model()
def pre_processing() -> pd.DataFrame:
    print("price_predictor: Preprocessing data...")
    df = pd.read_csv(dataset_path, skiprows=1, names=["dates", "Item Name", "Date", "price"])
    df = df.dropna(subset=["price"])
    df["dates"] = pd.to_datetime(df["dates"].astype(str), format="%Y%m%d")
    df["year"] = df["dates"].dt.year
    df["month"] = df["dates"].dt.month
    df["day"] = df["dates"].dt.day
    df["weekday"] = df["dates"].dt.weekday
    return df
def train_model(df: pd.DataFrame):
    print("price_predictor: Training model...")
    global model, le
    le = LabelEncoder()
    df["item_encoded"] = le.fit_transform(df["Item Name"])
    X = df[["item_encoded", "year", "month", "day", "weekday"]]
    y = df["price"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    print(f"price_predictor: Model trained with accuracy: {model.score(X_test, y_test):.2f}")
    return model
def save_model():
    print("price_predictor: Saving model and label encoder...")
    global model, le, mapping_file
    if model is None or le is None:
        raise Exception("price_predictor: Model and LabelEncoder must be trained before saving.")
    if not os.path.exists("models"):
        os.makedirs("models")
    if not os.path.exists(mapping_file):
        with open(mapping_file, "w") as f:
            f.write("model_name,model_path,label_encoder_path\n")
    with open(mapping_file, "a") as f:
        f.write(f"vegetable_price_model,models/vegetable_price_model.pkl,models/vegetable_price_label_encoder.pkl\n")
    joblib.dump(model, "models/vegetable_price_model.pkl")
    joblib.dump(le, "models/vegetable_price_label_encoder.pkl")
    print("price_predictor: Model and label encoder saved.")
def predict_price(item_name, target_date_str):
    global model, le
    if model is None or le is None:
        raise Exception("price_predictor: Model and LabelEncoder must be trained before prediction.")
    target_date = pd.to_datetime(target_date_str)
    try:
        item_encoded = le.transform([item_name])[0]
    except ValueError:
        raise ValueError(f"price_predcitr: Item '{item_name}' not found in the label encoder. Please check the item name.")
    year = target_date.year
    month = target_date.month
    day = target_date.day
    weekday = target_date.weekday()
    X_input = np.array([[item_encoded, year, month, day, weekday]])
    pred_price = model.predict(X_input)
    return pred_price[0]
def main():
    load_data()
    item_name = "Cabbage"
    target_date_str = "2023-10-01"
    predicted_price = predict_price(item_name, target_date_str)
    print(f"price_predictor: Predicted price for {item_name} on {target_date_str}: {predicted_price:.2f}")
if __name__ == "__main__":
    main()