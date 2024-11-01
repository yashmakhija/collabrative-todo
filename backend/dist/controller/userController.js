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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = void 0;
exports.userSignin = userSignin;
const user_validation_1 = require("../validation/user.validation");
const models_1 = require("../models/models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_key = process.env.JWT_Secret;
const SALT_ROUNDS = 10;
//signup fucntion
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_validation_1.userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            msg: `Input is wrong`,
            errors: result.error.format(),
        });
        return;
    }
    if (!jwt_key) {
        throw new Error("JWT Secret key is not defined in environment variables");
    }
    try {
        const existingUser = yield models_1.User.findOne({ email: result.data.email });
        if (existingUser) {
            res.status(400).json({ msg: "User already exists." });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(result.data.password, SALT_ROUNDS);
        const newUser = new models_1.User(Object.assign(Object.assign({}, result.data), { password: hashedPassword }));
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({
            userId: newUser._id,
            email: result.data.email,
        }, jwt_key, { expiresIn: "1h" });
        res
            .status(201)
            .json({ msg: "User created successfully.", token: `Bearer ${token}` });
    }
    catch (error) {
        console.error("Error message:", error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
    }
});
exports.userSignup = userSignup;
//signin function
function userSignin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = user_validation_1.signInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                msg: `Input is wrong`,
                errors: result.error.format(),
            });
            return;
        }
        try {
            const user = yield models_1.User.findOne({ email: result.data.email });
            if (!user) {
                res.status(400).json({ msg: "Invalid email or password." });
                return;
            }
            const isValid = yield bcrypt_1.default.compare(result.data.password, user.password);
            if (!isValid) {
                res.status(400).json({ msg: "Invalid email or password." });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user._id,
                email: result.data.email,
            }, jwt_key, { expiresIn: "1h" });
            res
                .status(200)
                .json({ msg: "Sign-in successful.", token: `Bearer ${token}` });
        }
        catch (err) {
            res.status(500).json({ msg: "Internal Server Error" });
            return;
        }
    });
}
