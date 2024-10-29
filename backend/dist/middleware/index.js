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
        res.sendStatus(401); // No token, unauthorized
        return;
    }
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
        res.sendStatus(401);
        return;
    }
    jsonwebtoken_1.default.verify(token, jwt_key, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        // Attach user info to request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};
exports.authenticateJWT = authenticateJWT;
