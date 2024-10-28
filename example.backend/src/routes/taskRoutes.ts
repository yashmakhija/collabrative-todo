import { Router } from "express";
import { addTask } from "../controllers/taskController";

const router = Router();

router.post("/list/:listId/task", addTask);

export default router;
