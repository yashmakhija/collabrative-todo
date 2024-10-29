import express from "express";
import dotenv from "dotenv";
import { userSignin, userSignup } from "../controller/userController";

dotenv.config();
const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/signin", userSignin);

export default userRouter;
