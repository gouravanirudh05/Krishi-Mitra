from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import crop_predictor
import price_predictor
app = FastAPI()
crop_predictor.load_data()
price_predictor.load_data()
class PredictionRequest(BaseModel):
    item_name: str
    date: str  
class CropInput(BaseModel):
    Temparature: float
    Humidity: float
    Moisture: float
    Soil_Type: str
    Nitrogen: float
    Potassium: float
    Phosphorous: float
class CropFertilizerRequest(CropInput):
    crop_name: str
class CropFertilizerRecommendation(BaseModel):
    crop: str
    probability: float
    fertilizer: str
    fertilise_once_in_days: int  
class CropFertilizerResponse(BaseModel):
    recommendations: List[CropFertilizerRecommendation]
@app.get("/")
def root():
    return {"message": "Welcome to the Crop and Price Prediction API"}
@app.post("/predict-price")
def predict_price(req: PredictionRequest):
    try:
        predicted_price = price_predictor.predict_price(req.item_name, req.date)
    except ValueError as e:
        return {"error": str(e)}
    return {
        "item_name": req.item_name,
        "date": req.date,
        "predicted_price": f"{predicted_price:.2f}"
    }
@app.post("/predict-crop-fertilizer", response_model=CropFertilizerResponse)
def predict_crop_and_fertilizer(input_data: CropInput):
    try:
        raw_recommendations = crop_predictor.get_top_crop_fertilizer_recommendations(
            input_data.Temparature,
            input_data.Humidity,
            input_data.Moisture,
            input_data.Soil_Type,
            input_data.Nitrogen,
            input_data.Potassium,
            input_data.Phosphorous,
            top_n=3
        )
        encoded_soil = crop_predictor.encoders["Soil Type"].transform([input_data.Soil_Type])[0]
        input_array_base = [
            input_data.Temparature,
            input_data.Humidity,
            input_data.Moisture,
            encoded_soil,
            input_data.Nitrogen,
            input_data.Potassium,
            input_data.Phosphorous
        ]
        enriched_recommendations = []
        for rec in raw_recommendations:
            days = crop_predictor.predict_fertilising_days([input_array_base])
            enriched_recommendations.append({
                "crop": rec["crop"],
                "probability": rec["probability"],
                "fertilizer": rec["fertilizer"],
                "fertilise_once_in_days": days
            })
        return {"recommendations": enriched_recommendations}
    except Exception as e:
        return {"error": str(e)}
@app.post("/recommend-fertilizer")
def recommend_fertilizer(data: CropFertilizerRequest):
    try:
        fertilizer = crop_predictor.get_fertilizer_for_crop(data.crop_name)
        encoded_soil = crop_predictor.encoders["Soil Type"].transform([data.Soil_Type])[0]
        input_array = [[
            data.Temparature,
            data.Humidity,
            data.Moisture,
            encoded_soil,
            data.Nitrogen,
            data.Potassium,
            data.Phosphorous
        ]]
        days = crop_predictor.predict_fertilising_days(input_array)
        return {
            "recommended_fertilizer": fertilizer,
            "fertilise_once_in_days": days
        }
    except Exception as e:
        return {"error": str(e)}
