import mongoose from 'mongoose';

const Farmer = mongoose.model('Farmer', new mongoose.Schema({
    name: String,
    phoneNumber: String,
}));

export default Farmer;