import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_key = process.env.JWT_Secret as string;

// Middleware to authenticate JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  jwt.verify(token, jwt_key, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    // Attach user info to request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
