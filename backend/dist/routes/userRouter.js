"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userController_1 = require("../controller/userController");
dotenv_1.default.config();
const userRouter = express_1.default.Router();
userRouter.post("/signup", userController_1.userSignup);
userRouter.post("/signin", userController_1.userSignin);
exports.default = userRouter;
