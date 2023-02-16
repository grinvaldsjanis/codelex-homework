import axios from "axios";

const baseURL = "http://localhost:3004";
export const hostURL = "http://localhost:5173";

const client = axios.create({
  baseURL,
});


export const postResult = async (data:{winnerLives:number}) => {
  try {
    const response = await client.post("/results", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getResults = async () => {
  try {
    const response = await client.get("/results");
    return response.data;
  } catch (error) {
    throw error;
  }
};

