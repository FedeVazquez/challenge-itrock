import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/taskdb";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🚀 Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
