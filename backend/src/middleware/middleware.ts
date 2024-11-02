import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_key = process.env.JWT_Secret as string;

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload; // Type this based on your JWT payload structure
  }
}

// Middleware to authenticate JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  jwt.verify(token, jwt_key, (err, user) => {
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
