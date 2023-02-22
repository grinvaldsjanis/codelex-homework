import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskData, postTaskData, updateTaskData } from "../components/api/client";
import { TaskType } from "../types";

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation<TaskType, any, TaskType, string>(
      (data) => postTaskData(data),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks']);
        },
        onError: (error) => console.log(error),
      }
    );
  };
  
  export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTaskData, {
      onSuccess: () => queryClient.invalidateQueries(['tasks']),
      onError: (error) => console.log(error),
    });
  };
  
  export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<TaskType, any, { taskId: string; data: TaskType }>(
      (variables) => updateTaskData(variables.taskId, variables.data),
      {
        onSuccess: (data) => {
          queryClient.setQueryData<TaskType[] | undefined>(['tasks'], (prevData) => {
            if (!prevData) {
              return [];
            }
            const taskIndex = prevData.findIndex((task) => task._id === data._id);
            if (taskIndex === -1) {
              return prevData;
            }
            const updatedTasks = [...prevData];
            updatedTasks[taskIndex] = data;
            return updatedTasks;
          });
        },
        onError: (error) => console.log(error),
      }
    );
  };
  