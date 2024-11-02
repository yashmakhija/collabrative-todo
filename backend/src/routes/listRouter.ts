import express from "express";
import dotenv from "dotenv";
import { addTask, createList } from "../controller/listController";

dotenv.config();
const listRouter = express.Router();

listRouter.post("/create", createList);
listRouter.post("/:listId/task", addTask);

export default listRouter;
