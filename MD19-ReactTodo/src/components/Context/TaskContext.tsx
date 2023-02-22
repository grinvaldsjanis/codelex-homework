import React from "react";
import { TaskType } from "../../types";
import { useAddTask, useDeleteTask, useUpdateTask } from "../../utils/customHooks";

export type TaskContextType = {
  tasks: TaskType[];
  addTask: (newTaskTitle: string) => Promise<void>;
  updateTask: (taskId: string, updatedTask: TaskType) => Promise<TaskType>;
  deleteTask: (taskId: string) => Promise<void>;
  isLoading: boolean;
};

export const TaskContext = React.createContext<TaskContextType>({
  tasks: [],
  addTask: async (newTaskTitle: string) => {},
  updateTask: async (taskId: string, updatedTask: TaskType) => Promise.resolve(updatedTask),
  deleteTask: async (taskId: string) => {},
  isLoading: true,
});
