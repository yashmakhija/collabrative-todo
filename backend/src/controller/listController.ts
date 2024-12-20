import { Request, Response } from "express";
import { Task, TodoList } from "../models/models";
import { taskSchema } from "../validation/task.validation";

//create a list - like a category (To-do list)
export const createList = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { userId: string }).userId;

    if (!userId) {
      res.status(400).json({ message: "User ID not found in token" });
      return;
    }

    const { title } = req.body;

    const existingList = await TodoList.findOne({
      owner: userId,
      title: title,
    });

    if (existingList) {
      res.status(400).json({
        message: "A to-do list with this title already exists for this user.",
      });
      return;
    }

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
  const listId = req.params.listId;
  const result = taskSchema.safeParse(req.body);
  if (!result.success) {
    res.status(411).json({
      message: `Invalid input data`,
    });
    return;
  }
  try {
    const newTask = new Task({
      title: result.data?.title,
      assignee: result.data?.assignee,
      priority: result.data?.priority,
      dueDate: result.data?.dueDate,
    });

    await newTask.save();

    const updatedList = await TodoList.findByIdAndUpdate(
      listId,
      { $push: { tasks: newTask._id } },
      { new: true, runValidators: true }
    );

    if (!updatedList) {
      res.status(404).json({ message: "To-Do List not found" });
      return;
    }

    res.status(201).json({
      message: "Task added successfully",
      task: newTask,
      list: updatedList,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Error adding task to to-do list", error });
  }
};

//delete a task on list (user who create the task on that list could be deleted )

export const deleteTask = async (req: Request, res: Response) => {
  const { listId, taskId } = req.params;
  const userId = (req.user as { userId: string }).userId;

  if (!listId && !taskId) {
    res.status(404).json({
      message: `Wrong inputs`,
    });
    return;
  }

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //note:- Drawback (due to assigne can delete but its not good idealogy)
    if (task.assignee !== userId) {
      res
        .status(403)
        .json({ message: "You do not have permission to delete this task" });
      return;
    }

    await Task.findByIdAndDelete(taskId);

    await TodoList.findByIdAndUpdate(listId, { $pull: { tasks: taskId } });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task", error });
    return;
  }

  const findTask = await Task.find;
};
