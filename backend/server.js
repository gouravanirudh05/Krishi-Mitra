import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Farmer from "./models/farmerModel.js";
import getLocationHierarchy from "./gemini.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/checkFarmer", async (req, res) => {
    try{
      const {phoneNumber} = req.body;
      console.log(phoneNumber);
      const farmer = await Farmer.findOne({phoneNumber});
      if(farmer)
        res.json({exists: true});
      else
        res.json({exists: false});
    }
    catch(err){
      res.status(500).json({error: err});
    }
});

app.post("/api/registerFarmer", async (req, res) => {
    try{
      const {name, phoneNumber, townBody, landArea} = req.body;
      console.log(name);
      const {state, district, block, town} = await getLocationHierarchy(townBody);
      console.log(state, district, block, town);
      const oldFarmer = await Farmer.findOne({phoneNumber});
      if(oldFarmer){
        res.status(403).json({registered: false, message: 'Farmer already exists'});
        return;
      }
      const farmer = new Farmer({name, phoneNumber, district, town, block, state, landArea});
      await farmer.save();
      res.json({registered: true});
    }
    catch(err){
      res.status(500).json({error: err});
    }
});