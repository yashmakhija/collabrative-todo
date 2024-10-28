import express from "express";
import cors from "cors";
import connectDB from "./db";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

export default app;
