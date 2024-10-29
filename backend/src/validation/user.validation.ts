import { z } from "zod";

export const userSchema = z.object({
  userId: z.string().nonempty({ message: "User ID cannot be empty." }),
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z.string().nonempty({ message: "Password cannot be empty." }),
});
