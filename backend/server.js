import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Farmer from "./models/farmerModel.js";
import getLocationHierarchy from "./gemini.js";
import marketPlaceRoutes from "./routes/marketPlaceRoutes.js"
import callRoutes from "./routes/callRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/api/marketPlace", marketPlaceRoutes);
app.use("/api/callRoutes", callRoutes);


// (async () => {
//   const townBody = "Puttur";

//   const {state, district, block, town} = await getLocationHierarchy(townBody);
//   console.log(state, district, block, town);
// })();