import express from "express";
import userRouter from "./userRouter";
import listRouter from "./listRouter";
import { authenticateJWT } from "../middleware/middleware";

const routesRouter = express.Router();

routesRouter.use("/user", userRouter);
routesRouter.use("/list", authenticateJWT, listRouter);

export default routesRouter;
