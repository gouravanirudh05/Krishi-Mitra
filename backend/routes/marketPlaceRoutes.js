import { Router } from 'express';
import twilio from 'twilio';
import {Otp} from "../models/otpModel.js";
import Farmer from '../models/farmerModel.js';
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

export default router;