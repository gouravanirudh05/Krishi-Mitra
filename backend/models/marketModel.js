import mongoose from 'mongoose';

const Market = mongoose.model('Market', new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    cropName: String,
    cropQuantity: Number,
    cropPrice: Number
}));

export default Market;