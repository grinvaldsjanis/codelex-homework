import { TaskInterface } from "./../models/TaskSchema";
import express, { NextFunction, Request, Response } from "express";
import TaskModel from "../models/TaskSchema";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks: TaskInterface[] = await TaskModel.find();
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Create a new task
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, done, priority } = req.body;
    const newTask: TaskInterface = new TaskModel({
      title,
      description,
      done,
      priority,
    });
    const savedTask: TaskInterface = await newTask.save();
    return res.status(201).json({ task: savedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update a task
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("Data received by the server:", req.body);
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const updatedTask: TaskInterface | null = await TaskModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        done: req.body.done,
        priority: req.body.priority,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task: updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE request
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTask: TaskInterface | null = await TaskModel.findByIdAndDelete(
      id
    );
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task: deletedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
