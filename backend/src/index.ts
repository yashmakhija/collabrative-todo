import express from "express";
import dotenv from "dotenv";
import routesRouter from "./routes/routes";

dotenv.config();

const app = express();

app.use("/api/v0", routesRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
