import { GoogleGenAI } from "@google/genai";
//load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function getLocationHierarchy(town) {
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
  
export default getLocationHierarchy;