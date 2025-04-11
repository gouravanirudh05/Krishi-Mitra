import mongoose from 'mongoose';

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: String,
    phoneNumber: String,
}));

export default Customer;