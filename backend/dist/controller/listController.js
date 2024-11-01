"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createList = void 0;
const models_1 = require("../models/models");
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(400).json({ message: "User ID not found in token" });
            return;
        }
        const { title } = req.body;
        const newList = new models_1.TodoList({
            owner: userId,
            title: title,
            tasks: [],
            collaborators: [],
        });
        yield newList.save();
        res.status(201).json({
            message: "To-Do list created successfully",
            list: newList,
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error creating to-do list", error: error });
    }
});
exports.createList = createList;
