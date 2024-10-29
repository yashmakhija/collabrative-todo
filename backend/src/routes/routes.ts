import express from "express";
import userRouter from "./userRouter";

const routesRouter = express.Router();

routesRouter.use("/user", userRouter);

export default routesRouter;
