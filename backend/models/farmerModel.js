import mongoose from 'mongoose';

const Farmer = mongoose.model('Farmer', new mongoose.Schema({
    name: String,
    phoneNumber: String,
    district: String,
    state: String,
    town: String,
    landArea: Number
}));

export default Farmer;