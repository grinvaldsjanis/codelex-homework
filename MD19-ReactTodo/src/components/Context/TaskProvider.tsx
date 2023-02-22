import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskType, Priority } from "../../types";
import {
  useAddTask,
  useDeleteTask,
  useUpdateTask,
} from "../../utils/customHooks";
import { getTasksData } from "../api/client";
import { TaskContext } from "./TaskContext";

type TaskProviderProps = {
  children: React.ReactNode;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery<TaskType[]>(
    ["tasks"],
    getTasksData,
    {
      staleTime: 5000,
      refetchOnWindowFocus: true,
    }
  );

  const addTaskMutation = useAddTask();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const addTask = async (newTaskTitle: string) => {
    const newTask: TaskType = {
      title: newTaskTitle,
      priority: Priority.highest,
      done: false,
    };
    await addTaskMutation.mutateAsync(newTask);
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskMutation.mutateAsync(taskId);
  };

  const updateTask = async (
    taskId: string,
    updatedTask: TaskType
  ): Promise<TaskType> => {
    if (!taskId) {
      return updatedTask;
    }

    const updatedTaskData = { ...updatedTask };
    const updatedTaskResponse = await updateTaskMutation.mutateAsync({
      taskId,
      data: updatedTaskData,
    });
    return updatedTaskResponse;
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, isLoading }}
    >
      {children}
    </TaskContext.Provider>
  );
};
