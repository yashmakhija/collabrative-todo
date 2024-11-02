"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const zod_1 = require("zod");
exports.taskSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty({ message: "Title can not be empty" }),
    assignee: zod_1.z.string().optional(),
    priority: zod_1.z.enum(["low", "medium", "high"]).optional(),
    dueDate: zod_1.z.date().optional(),
});
