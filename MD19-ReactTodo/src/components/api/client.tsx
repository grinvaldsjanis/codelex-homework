import axios from "axios";
import { TaskType } from "../../types";

const baseURL = "http://localhost:3005";

const client = axios.create({
  baseURL,
});



export const postTaskData = async (data: any) => {
  try {
    const response = await client.post('/tasks', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasksData = async () => {
  try {
    const response = await client.get('/tasks');
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

export const updateTaskData = async (_id: string, updatedTask: TaskType): Promise<TaskType> => {
  console.log('Before updateTaskData:', updatedTask);
  try {
    const response = await client.put(`/tasks/${_id}`, updatedTask);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// export async function updateTaskData(_id:string, updateTaskData:TaskType) {
//   try {
//     const response = await axios.put(`/tasks/${_id}`, updateTaskData);
//     console.log(response.data); // print the response from the server
//     return response.data.task;
//   } catch (error) {
//     console.error(error);
//   }
// }




