import express from "express";
import userRouter from "./userRouter";
import listRouter from "./listRouter";

const routesRouter = express.Router();

routesRouter.use("/user", userRouter);
routesRouter.use("/list", listRouter);

export default routesRouter;
