"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_key = process.env.JWT_Secret;
// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" }); // No token, unauthorized
        return;
    }
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
        res
            .status(401)
            .json({ message: "Token missing from Authorization header" });
        return;
    }
    jsonwebtoken_1.default.verify(token, jwt_key, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ message: "Token has expired" });
            }
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user; // Ensure this contains the userId
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
