import mongoose from 'mongoose';

const Crop = mongoose.model('Crop', new mongoose.Schema({
    name: String,
    fertilizer: String,
    fertilizerPeriod: Number
}));

export default Crop;