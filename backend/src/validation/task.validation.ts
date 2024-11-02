import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().nonempty({ message: "Title can not be empty" }),
  assignee: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.date().optional(),
});
