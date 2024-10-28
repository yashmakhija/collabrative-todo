import { Request, Response } from "express";
import TodoList from "../models/TodoList";

export const createList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, owner } = req.body;
  try {
    const list = new TodoList({ title, owner });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
