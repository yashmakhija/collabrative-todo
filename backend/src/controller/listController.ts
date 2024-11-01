import { Request, Response } from "express";
import { TodoList } from "../models/models";

//create a list - like a category (To-do list)
export const createList = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { userId: string }).userId;

    if (!userId) {
      res.status(400).json({ message: "User ID not found in token" });
      return;
    }

    const { title } = req.body;

    const newList = new TodoList({
      owner: userId,
      title: title,
      tasks: [],
      collaborators: [],
    });

    await newList.save();

    res.status(201).json({
      message: "To-Do list created successfully",
      list: newList,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating to-do list", error: error });
  }
};

//create a task on list (like adding task in category)

export const addTask = async (req: Request, res: Response) => {
    
};
