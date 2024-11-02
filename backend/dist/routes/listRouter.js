"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const listController_1 = require("../controller/listController");
dotenv_1.default.config();
const listRouter = express_1.default.Router();
listRouter.post("/create", listController_1.createList);
listRouter.post("/:listId/task", listController_1.addTask);
exports.default = listRouter;
