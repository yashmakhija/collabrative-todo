import { Router } from "express";
import { createList } from "../controllers/listController";

const router = Router();

router.post("/create", createList);

export default router;
