import { Request, Response } from "express";
import { userSchema } from "../validation/user.validation";

export function userSignup(req: Request, res: Response) {
  const { success } = userSchema.safeParse(req.body);
  
}
