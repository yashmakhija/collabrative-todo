import { Request, Response } from "express";
import { signInSchema, userSchema } from "../validation/user.validation";
import { User } from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_key = process.env.JWT_Secret as string;

const SALT_ROUNDS = 10;

//signup fucntion
export const userSignup = async (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body);
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
    const existingUser = await User.findOne({ email: result.data.email });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(result.data.password, SALT_ROUNDS);

    const newUser = new User({ ...result.data, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign(
      {
        email: result.data.email,
      },
      jwt_key,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ msg: "User created successfully.", token: `Bearer ${token}` });
  } catch (error) {
    console.error("Error message:", error);
    res.status(500).json({ msg: "Internal Server Error" });
    return;
  }
};

//signin function
export async function userSignin(req: Request, res: Response) {
  const result = signInSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      msg: `Input is wrong`,
      errors: result.error.format(),
    });
    return;
  }
  try {
    const user = await User.findOne({ email: result.data.email });
    if (!user) {
      res.status(400).json({ msg: "Invalid email or password." });
      return;
    }

    const isValid = await bcrypt.compare(result.data.password, user.password);
    if (!isValid) {
      res.status(400).json({ msg: "Invalid email or password." });
      return;
    }

    const token = jwt.sign(
      {
        email: result.data.email,
      },
      jwt_key,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ msg: "Sign-in successful.", token: `Bearer ${token}` });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
    return;
  }
}
