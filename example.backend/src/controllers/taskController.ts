import { Request, Response } from "express";
import Task from "../models/Task";

export const addTask = async (req: Request, res: Response): Promise<void> => {
  const { title, listId } = req.body;
  try {
    const task = new Task({ title, listId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
