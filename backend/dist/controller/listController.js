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
exports.addTask = exports.createList = void 0;
const models_1 = require("../models/models");
const task_validation_1 = require("../validation/task.validation");
//create a list - like a category (To-do list)
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(400).json({ message: "User ID not found in token" });
            return;
        }
        const { title } = req.body;
        const existingList = yield models_1.TodoList.findOne({
            owner: userId,
            title: title,
        });
        if (existingList) {
            res.status(400).json({
                message: "A to-do list with this title already exists for this user.",
            });
            return;
        }
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
//create a task on list (like adding task in category)
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const listId = req.params.listId;
    const result = task_validation_1.taskSchema.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({
            message: `Invalid input data`,
        });
        return;
    }
    try {
        const newTask = new models_1.Task({
            title: (_a = result.data) === null || _a === void 0 ? void 0 : _a.title,
            assignee: (_b = result.data) === null || _b === void 0 ? void 0 : _b.assignee,
            priority: (_c = result.data) === null || _c === void 0 ? void 0 : _c.priority,
            dueDate: (_d = result.data) === null || _d === void 0 ? void 0 : _d.dueDate,
        });
        yield newTask.save();
        const updatedList = yield models_1.TodoList.findByIdAndUpdate(listId, { $push: { tasks: newTask._id } }, { new: true, runValidators: true });
        if (!updatedList) {
            res.status(404).json({ message: "To-Do List not found" });
            return;
        }
        res.status(201).json({
            message: "Task added successfully",
            task: newTask,
            list: updatedList,
        });
    }
    catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Error adding task to to-do list", error });
    }
});
exports.addTask = addTask;
