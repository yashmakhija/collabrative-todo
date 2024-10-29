import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.DB_URI; // Make sure this variable is defined in your .env file

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit the application if the connection fails
  }
};

// Export the connection function
export default connectDB;
