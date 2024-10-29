import express from "express";
import dotenv from "dotenv";

dotenv.config();
const userRouter = express.Router();

userRouter.post("/signup");

userRouter.post("/signin");

export default userRouter;
