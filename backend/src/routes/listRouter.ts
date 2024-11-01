import express from "express";
import dotenv from "dotenv";
import { createList } from "../controller/listController";

dotenv.config();
const listRouter = express.Router();

listRouter.post("/create", createList);

export default listRouter;
