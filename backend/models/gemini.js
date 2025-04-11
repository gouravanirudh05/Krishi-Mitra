import { GoogleGenAI } from "@google/genai";
//load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function getLocationHierarchy(town, state) {
    const prompt = `
  You are an expert in Indian administrative geography.
  
  Given the following town, return a JSON object with the corrected and structured format:
  {
    "state": "<corrected full state name in India>",
    "district": "<the correct district that the town belongs to in the given state>",
    "block": "<the correct block or taluka in that district that the town belongs to>",
    "town": "<corrected town or village name>"
  }
  
  Town: ${town}
  
  Only return the JSON object. Do not include any explanation.
  `;
  
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro", // or "gemini-2.0-flash" if you prefer speed over depth
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
  
    try {
      const jsonText = response.text.trim().match(/\{[\s\S]*\}/)[0];
      const result = JSON.parse(jsonText);
      return result;
    } catch (e) {
      console.error("Failed to parse response:", response.text);
      return null;
    }
  }
  


  async function getCropGrowthStage(crop, sownDate, currentDate) {
    const prompt = `
  You are an expert in crop science and agronomy.
  
  Given the crop name, sown date, and current date, determine the current growth stage of the crop in terms of water use and evapotranspiration characteristics.
  
  Return a JSON object like:
  {
    "stage": "initial" | "mid" | "late",
    "daysAfterSowing": <number>
    }
  
  Crop: ${crop}
  Sown Date: ${sownDate}
  Current Date: ${currentDate}
  
  Do NOT include anything other than the JSON object in the response.
    `;
  
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro", // Use "gemini-2.0-flash" for faster but lighter response
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
  
    try {
      const jsonText = response.text.trim().match(/\{[\s\S]*\}/)[0];
      const result = JSON.parse(jsonText);
      return result;
    } catch (e) {
      console.error("Failed to parse Gemini response:", response.text);
      return null;
    }
  }

  async function getFarmingTips({ district, area, crops, fertilizers }) {
    const cropsList = crops.join(', ');
    const fertList = fertilizers.join(', ');
    
    const prompt = `
  You are an expert agricultural advisor for Indian farmers.
  
  Based on the following inputs, provide clear, practical, and location-aware farming tips in bullet points. Use farmer-friendly language. Keep it under 150 words.
  
  Inputs:
  - District: ${district}
  - Land Area: ${area} acres
  - Crops Sown: ${cropsList}
  - Fertilizers Used: ${fertList}
  
  Format:
  {
    "summary": "<Short personalized advice summary>",
    "tips": [
      "<Tip 1>",
      "<Tip 2>",
      ...
    ]
  }
  
  Only return the JSON object.
    `;
  
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
  
    try {
      const jsonText = response.text.trim().match(/\{[\s\S]*\}/)[0];
      return JSON.parse(jsonText);
    } catch (e) {
      console.error("Failed to parse farming tips:", response.text);
      return null;
    }
  }
   

export {getLocationHierarchy,getCropGrowthStage,getFarmingTips};