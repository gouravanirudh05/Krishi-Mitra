import jwt from 'jsonwebtoken';
import Customer from '../models/customerModel.js';

const customerAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const jwtKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtKey);

        const customer = await Customer.findOne({ _id: decoded.customer });
        if (!customer) {
            throw new Error();
        }

        req.customer = customer;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

export default customerAuthMiddleware;