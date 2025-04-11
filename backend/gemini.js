import { GoogleGenAI } from "@google/genai";
//load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function getLocationHierarchy(town) {
  const prompt = `
  You are an expert in Indian administrative geography.
  
  Given the name of a town or village, return a JSON object with the corrected and structured administrative hierarchy in India. Ensure all names are properly capitalized and standardized.
  
  Format:
  {
    "state": "<Full, corrected state name in India>",
    "district": "<Correct district name within the state>",
    "block": "<Correct block or taluka within the district>",
    "town": "<Corrected town or village name>"
  }
  
  Town: ${town}
  
  Respond with only the JSON object. Do not include any additional explanation or text.
  `;
  
  
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro", // or "gemini-2.0-flash" if you prefer speed over depth
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log("responseee: "+response.text);
  
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