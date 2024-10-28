import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = process.env.DB_URI; // Ensure this is defined
    if (!dbUri) {
      throw new Error("DB_URI is undefined. Check your .env file.");
    }

    await mongoose.connect(process.env.DB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
