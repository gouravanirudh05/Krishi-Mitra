import { Router } from 'express';
import twilio from 'twilio';
import {Otp} from "../models/otpModel.js";
import Farmer from '../models/farmerModel.js';
import Crop from '../models/cropModel.js';
import FarmerCrop from '../models/farmerCropsModel.js';
import farmerAuthMiddleware from '../middlewares/farmerAuthMiddleware.js';
import NPK from "../models/NPKModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from "axios";
import dotenv from 'dotenv';
import Market from '../models/marketModel.js';

dotenv.config();

const router = Router();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);


async function getWeatherByLocation1(location) {
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    // const locResponse= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherAPIKey}`);
    // const locData = await locResponse.json();
  
    // const lat = locData[0].lat;
    // const lon = locData[0].lon;
    //const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=1&appid=${weatherAPIKey}`;
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPIKey}&units=metric`;
    const apiKey = process.env.ACCUWEATHER_API_KEY;
    const query = encodeURIComponent(location);
    const loc_url = `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${query}&language=en-us&details=true&offset=0&alias=Always`;
    const response1 = await fetch(loc_url);
    const data1 = await response1.json();
    const cityKey=data1[0].Key;
    console.log(cityKey);
    const forecast_url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${apiKey}&details=true&metric=true`;
    try {
      const response2 = await fetch(forecast_url);
      const data2 = await response2.json();
  
      if (response2.ok) {
        console.log(data2);
        //const temperature = data.main.temp;
        //const humidity = data.main.humidity;
        const maxTemp = data2.DailyForecasts[0].Temperature.Maximum.Value;
        const minTemp = data2.DailyForecasts[0].Temperature.Minimum.Value;
        const temperature = (maxTemp + minTemp) / 2;
        const humidity = data2.DailyForecasts[0].Day.RelativeHumidity?.Average ?? 50;
  
        return {temperature,humidity};
      } else {
        throw new Error(data2.message || "Failed to fetch weather data.");
      }
    } catch (err) {
      throw err;
    }
  }

async function getNPKValues(district){
  //const district = getLocationHierarchy(state, town).district.toUpperCase().trim();
  // var { state, district, block, town } = await getLocationHierarchy(state, town);
  // console.log(state+" "+district+" "+block+" "+town);
  district=district.toUpperCase();
  
  
  //console.log(district);
  //search for district in database collection NPK values
  const npk = await NPK.findOne({"District": district});
  if(npk){
    //if found, return the values
    const {
      ["Nitrogen - High"]: rawNitrogenHigh,
      ["Nitrogen - Medium"]: rawNitrogenMedium,
      ["Nitrogen - Low"]: rawNitrogenLow,
      ["Potassium - High"]: rawPotassiumHigh,
      ["Potassium - Medium"]: rawPotassiumMedium,
      ["Potassium - Low"]: rawPotassiumLow,
      ["Phosphorous - Low"]: rawPhosphorousLow,
      ["Phosphorous - High"]: rawPhosphorousHigh,
      ["Phosphorous - Medium"]: rawPhosphorousMedium,
    } = npk;
    
    // Helper function to clean and convert to number
    const parsePercent = (str) => parseFloat(str.replace('%', '').trim());
    
    const nitrogenHigh = parsePercent(rawNitrogenHigh);
    const nitrogenMedium = parsePercent(rawNitrogenMedium);
    const nitrogenLow = parsePercent(rawNitrogenLow);
    const potassiumHigh = parsePercent(rawPotassiumHigh);
    const potassiumMedium = parsePercent(rawPotassiumMedium);
    const potassiumLow = parsePercent(rawPotassiumLow);
    const phosphorousLow = parsePercent(rawPhosphorousLow);
    const phosphorousHigh = parsePercent(rawPhosphorousHigh);
    const phosphorousMedium = parsePercent(rawPhosphorousMedium);

    const nitrogenVal = (nitrogenHigh*700 + nitrogenMedium*420 + nitrogenLow*300)/(100);
    const potassiumVal = (potassiumHigh*30 + potassiumMedium*18 + potassiumLow*5)/(100);
    const phosphorousVal = (phosphorousHigh*350 + phosphorousMedium*200 + phosphorousLow*60)/(100);

    return {
      nitrogenVal,
      potassiumVal,
      phosphorousVal
    };
  }
  else{
    //if not found, return null
    return null;
  }
}

router.post("/sendOtp", async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      console.log(phoneNumber);
  
      const farmer = await Farmer.findOne({phoneNumber});
  
      if(!farmer)
        return res.status(404).json({success: false, message: "Farmer does not exists."});
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      await Otp.deleteMany({ phoneNumber }); // remove previous OTPs
      await new Otp({ phoneNumber, otp }).save();
  
      await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: phoneNumber,
      });
  
      res.json({ success: true, message: "OTP sent" });
    } catch (err) {
      res.status(500).json({ success: false, message: "SMS failed", error: err.message });
      console.log(err.message);
    }
  });
  
router.post("/verifyOtp", async (req, res) => {
    const { phoneNumber, otp } = req.body;

    const farmer = await Farmer.findOne({phoneNumber});

    if(!farmer)
        return res.status(404).json({success: false, message: "Farmer does not exists."});

    const record = await Otp.findOne({ phoneNumber, otp });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    await Otp.deleteMany({ phoneNumber });

    const token = jwt.sign({ phoneNumber, farmer: farmer._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

    res.json({ success: true, token });
});

router.post("/farmer/addCrop", farmerAuthMiddleware, async (req, res) => {
    const { cropName, cost } = req.body;

    const farmer = await Farmer.findById(req.farmer.id);

    if(!farmer)
        return res.status(404).json({success: false, message: "Farmer does not exists."});

    const crop = await Crop.findOne({cropName});
    if(!crop)
        return res.status(404).json({success: false, message: "Farmer does not exists."});

    const farmerCrop = new FarmerCrop({farmerId: farmer._id, cropId: crop._id, date: new Date(), cost});

    await farmerCrop.save();

    res.json({ success: true, token });
});

router.get("/farmer/getCrops", farmerAuthMiddleware, async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.farmer.id);

        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer does not exist." });
        }

        const farmerCrops = await FarmerCrop.find({ farmerId: req.farmer.id })

        // const crops = farmerCrops.map(fc => ({
        //     crop: fc.cropId,      // This contains the populated Crop object
        //     date: fc.date,
        //     cost: fc.cost
        // }));

        res.json({ success: true, farmerCrops});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post("/farmer/getCrop", farmerAuthMiddleware, async (req, res) => {
  try {
    console.log(req.body);
      const farmer = await Farmer.findById(req.farmer.id);

      if (!farmer) {
          return res.status(404).json({ success: false, message: "Farmer does not exist." });
      }

      const farmerCrops = await FarmerCrop.findOne({ farmerId: req.farmer.id, cropName: req.body.cropName});

      // const crops = farmerCrops.map(fc => ({
      //     crop: fc.cropId,      // This contains the populated Crop object
      //     date: fc.date,One
      //     cost: fc.cost
      // }));

      res.json({ success: true, farmerCrops});
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/farmer/uploadCrop", farmerAuthMiddleware, async (req, res) => {
    try {
        const {cropName, cropQuantity, cropPrice} = req.body;
        const farmer = await Farmer.findById(req.farmer.id);
  
        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer does not exist." });
        }
  
        const market = new Market({farmerId: req.farmer.id, cropName, cropQuantity, cropPrice});
        await market.save();
  
        res.json({ success: true, message: "You have uploaded the crop successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
  });

router.get("/customer/getCrops", async (req, res) => {
    try {
        const allFarmerCrops = await FarmerCrop.find()
            .populate("cropId")   // Get crop details
            .populate("farmerId"); // Get farmer details

        const crops = allFarmerCrops.map(fc => ({
            crop: fc.cropId,     // Full crop info
            farmer: fc.farmerId, // Full farmer info
            date: fc.date,
            cost: fc.cost
        }));

        res.json({ success: true, crops });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/farmer/getProfile", farmerAuthMiddleware, async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.farmer.id);
        res.json({farmer, sucess: true});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/farmerCall/addCrop", async (req, res) => {
    const { phoneNumber, cropName } = req.body;
  
    const farmer = await Farmer.findOne({phoneNumber});
  
    if(!farmer)
      return res.status(404).json({success: false, message: "Farmer does not exists."});
  
    const crop = await Crop.findOne({name: cropName});
  
    if(!crop)
      return res.status(404).json({success: false, message: "Crop does not exists."});
  
    const farmerCrop = new FarmerCrop({farmerId: farmer._id, cropId: crop._id, date: new Date()});
  
    await farmerCrop.save();

    const {nitrogenVal, potassiumVal, phosphorousVal} = await getNPKValues(farmer.district);
    const {temperature, humidity} = await getWeatherByLocation1(farmer.town);

    const requestBody = {
            Temparature: temperature,
            Humidity: humidity,
            Moisture: 40.0,
            Soil_Type: "Clayey",
            Nitrogen: nitrogenVal,
            Potassium: potassiumVal,
            Phosphorous: phosphorousVal,
            crop_name: cropName
          };
      
          try {
            const response = await axios.post("https://5b56-14-195-89-114.ngrok-free.app/recommend-fertilizer", requestBody);
            const fertilizer = response.data;
            console.log(fertilizer);
            res.json({fertilizer});
          } catch (error) {
            console.error("Fertilizer recommendation failed:", error.response?.data || error.message);
            res.status(500).json({ success: false, message: "Fertilizer recommendation failed", error: error.message });
          }
          
  
    // const interval = `${crop.fertilizerPeriod} days`;
  
    // // Create a unique job name per farmer+crop combo to avoid duplicates
    // const uniqueJobName = `reminder-${farmer._id}-${cropName}`;
  
    // await agenda.every(interval, 'send fertilizer reminder', {
    //   farmerId: farmer._id.toString(),
    //   cropName: cropName
    // }, { jobId: uniqueJobName });
  
    // res.json({ success: true });
  });


export default router;