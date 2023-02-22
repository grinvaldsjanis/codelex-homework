import { Schema, model, Document } from "mongoose";

type Priority = "highest" | "high" | "moderate" | "low";

export interface TaskInterface extends Document {
  title: string;
  done: boolean;
  priority?: Priority;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskInterface>({
  title: {
    type: String,
    required: [true, "Title required"],
  },
  priority: {
    type: String,
    enum: ["highest", "high", "moderate", "low"],
    default: undefined,
  },
  done: {
    type: Boolean,
    default: false,
    required: [true, "done required"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TaskModel = model<TaskInterface>("Task", taskSchema, "tasks");

export default TaskModel;
