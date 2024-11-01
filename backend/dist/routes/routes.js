"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const listRouter_1 = __importDefault(require("./listRouter"));
const middleware_1 = require("../middleware/middleware");
const routesRouter = express_1.default.Router();
routesRouter.use("/user", userRouter_1.default);
routesRouter.use("/list", middleware_1.authenticateJWT, listRouter_1.default);
exports.default = routesRouter;
