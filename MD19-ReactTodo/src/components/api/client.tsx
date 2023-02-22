import axios from "axios";
import { TaskType } from "../../types";

const baseURL = "http://localhost:3005";

const client = axios.create({
  baseURL,
});

export const postTaskData = async (data: TaskType) => {
  try {
    console.log("Before PostTaskData:", data);
    const response = await client.post("/tasks", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasksData = async () => {
  try {
    const response = await client.get("/tasks");
    return response.data.tasks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTaskData = async (_id: string) => {
  try {
    await client.delete(`/tasks/${_id}`);
  } catch (error) {
    throw error;
  }
};


export const updateTaskData = async (
  _id: string,
  data: TaskType
) => {
  console.log("Before updateTaskData:", data);
  try {
    const response = await client.put(`/tasks/${_id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

