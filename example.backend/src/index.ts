import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import listRoutes from "./routes/listRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
console.log("DB_URI:", process.env.DB_URI);
console.log("PORT:", process.env.PORT);

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/list", listRoutes);
app.use("/task", taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
