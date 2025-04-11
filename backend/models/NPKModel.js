import mongoose from 'mongoose';
const npkSchema = new mongoose.Schema({}, { strict: false });
const NPK = mongoose.model("NPK", npkSchema, "NPKSchema");

export default NPK;