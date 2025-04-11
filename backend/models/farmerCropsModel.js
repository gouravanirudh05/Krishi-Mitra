import mongoose from 'mongoose';

const FarmerCrop = mongoose.model('FarmerCrop', new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
    date: Date,
    cost: Number,
    cropName: String
}));

export default FarmerCrop;