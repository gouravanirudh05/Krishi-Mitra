import mongoose from 'mongoose';
const plantKc = new mongoose.Schema({}, { strict: false });
const Kc = mongoose.model("Kc", plantKc, "plantKc");

export default Kc;