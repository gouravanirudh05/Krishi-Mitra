// models/Otp.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  phoneNumber: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // auto-expire after 5 mins
});

export const Otp = mongoose.model('Otp', otpSchema);