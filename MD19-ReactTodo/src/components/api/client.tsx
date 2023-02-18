import axios from "axios";

const baseURL = "http://localhost:3005";

const client = axios.create({
  baseURL,
});


export const postTask = async (data: any) => {
  try {
    const response = await client.post("/tasks", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await client.get("/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
};