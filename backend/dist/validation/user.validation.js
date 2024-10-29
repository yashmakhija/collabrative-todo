"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    userId: zod_1.z.string().nonempty({ message: "User ID cannot be empty." }),
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email({ message: "Invalid email format." }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." }),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format." }),
    password: zod_1.z.string().nonempty({ message: "Password cannot be empty." }),
});
