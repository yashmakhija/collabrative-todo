import express from "express";
import dotenv from "dotenv";
import { userSignin, userSignup } from "../controller/userController";

dotenv.config();
const listRouter = express.Router();

export default listRouter;
