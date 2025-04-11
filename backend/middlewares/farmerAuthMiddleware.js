import jwt from 'jsonwebtoken';
import Farmer from '../models/farmerModel.js';

const farmerAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const jwtKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtKey);

        const farmer = await Farmer.findOne({ _id: decoded.farmer });
        if (!farmer) {
            throw new Error();
        }

        req.farmer = farmer;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

export default farmerAuthMiddleware;