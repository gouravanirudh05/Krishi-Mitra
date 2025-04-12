import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np
import os
import joblib

model = None
le = None

# UPDATED CSV PATH
dataset_path = "datasets/prices.csv"
mapping_file = "models/price_predictor_model_mapping.csv"
image_path = "models/metrics/"

def plot_regression_metrics(X_test, y_test):

    global model
    if model is None:
        raise Exception("price_predictor: Model must be trained before plotting metrics.")
    

    y_pred = model.predict(X_test)
    
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    metrics = [mae, mse, rmse, r2]
    labels = ["MAE", "MSE", "RMSE", "R²"]

    plt.figure(figsize=(8, 6))
    bars = plt.bar(labels, metrics, color=['#f94144', '#f3722c', '#f9c74f', '#43aa8b'])
    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, yval + 0.01, f'{yval:.2f}', ha='center', va='bottom')
    
    plt.title("Regression Metrics for Price Prediction")
    plt.ylabel("Score")
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()
    if (not os.path.exists(image_path)):
        os.makedirs(image_path)
    plt.savefig(os.path.join(image_path, "regression_metrics.png"))

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
                return
    print("price_predictor: Model not found or mapping missing. Training a new model...")
    df = pre_processing()
    train_model(df)
    save_model()

def pre_processing() -> pd.DataFrame:
    print("price_predictor: Preprocessing data...")
    df = pd.read_csv(dataset_path)
    
    # Assume column names (update if needed)
    required_columns = ["Date", "Item Name", "Price"]
    df.columns = [col.strip() for col in df.columns]
    assert all(col in df.columns for col in required_columns), f"Expected columns: {required_columns}"
    
    df = df[required_columns].dropna()
    df["Date"] = pd.to_datetime(df["Date"])
    df["year"] = df["Date"].dt.year
    df["month"] = df["Date"].dt.month
    df["day"] = df["Date"].dt.day
    df["weekday"] = df["Date"].dt.weekday
    return df

def train_model(df: pd.DataFrame):
    global model, le
    if model is not None:
        raise Exception("price_predictor: Model already trained. Please save or reset before retraining.")
    if le is not None:
        raise Exception("price_predictor: LabelEncoder already trained. Please save or reset before retraining.")

    print("price_predictor: Training model...")
    le = LabelEncoder()
    df["item_encoded"] = le.fit_transform(df["Item Name"])
    X = df[["item_encoded", "year", "month", "day", "weekday"]]
    y = df["Price"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    print(f"price_predictor: Model trained with R² score: {model.score(X_test, y_test):.2f}")
    
    # Plot the regression metrics
    plot_regression_metrics(model, X_test, y_test)


def save_model():
    global model, le, mapping_file
    print("price_predictor: Saving model and label encoder...")
    if model is None or le is None:
        raise Exception("Model and LabelEncoder must be trained before saving.")
    
    os.makedirs("models", exist_ok=True)
    
    model_path = "models/vegetable_price_model.pkl"
    le_path = "models/vegetable_price_label_encoder.pkl"
    
    # Rewrite mapping file
    with open(mapping_file, "w") as f:
        f.write("model_name,model_path,label_encoder_path\n")
        f.write(f"vegetable_price_model,{model_path},{le_path}\n")
    
    joblib.dump(model, model_path)
    joblib.dump(le, le_path)
    print("price_predictor: Model and label encoder saved.")

def predict_price(item_name, target_date_str):
    global model, le
    if model is None or le is None:
        raise Exception("Model and LabelEncoder must be trained before prediction.")
    
    target_date = pd.to_datetime(target_date_str)
    
    try:
        item_encoded = le.transform([item_name])[0]
    except ValueError:
        raise ValueError(f"Item '{item_name}' not found in training data. Please check the item name.")
    
    features = np.array([[item_encoded, target_date.year, target_date.month, target_date.day, target_date.weekday()]])
    pred_price = model.predict(features)
    return pred_price[0]

def main():
    load_data()
    item_name = "Cabbage"
    target_date_str = "2025-04-20"  # future date allowed
    try:
        predicted_price = predict_price(item_name, target_date_str)
        print(f"Predicted price for {item_name} on {target_date_str}: {predicted_price:.2f}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
