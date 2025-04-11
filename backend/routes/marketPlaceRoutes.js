import { Router } from 'express';
import twilio from 'twilio';
import {Otp} from "../models/otpModel.js";
import Farmer from '../models/farmerModel.js';
import Crop from '../models/cropModel.js';
import FarmerCrop from '../models/farmerCropsModel.js';
import farmerAuthMiddleware from '../middlewares/farmerAuthMiddleware.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/sendOtp", async (req, res) => {
    try {
      const { phoneNumber } = req.body;
  
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

    const token = jwt.sign({ phoneNumber, farmer: farmer._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" });

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
            .populate("cropId"); // This pulls in the full Crop details

        const crops = farmerCrops.map(fc => ({
            crop: fc.cropId,      // This contains the populated Crop object
            date: fc.date,
            cost: fc.cost
        }));

        res.json({ success: true, crops });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
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

export default router;