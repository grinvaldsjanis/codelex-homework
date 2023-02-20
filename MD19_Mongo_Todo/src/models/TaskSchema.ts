import { Schema, model, Document } from "mongoose";

export interface TaskInterface {
  save: any;
  title: string;
  done: boolean;
  priority?: "highest" | "high" | "moderate" | "low";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title required"],
  },
  priority: { type: String, enum: ["highest", "high", "moderate", "low"] },
  done: { type: Boolean, default: false, required: [true, "done required"], },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TaskModel = model("Task", taskSchema, "tasks");

export default TaskModel;
