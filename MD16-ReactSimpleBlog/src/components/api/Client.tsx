import axios from "axios";

const baseURL = "http://localhost:3004";
export const hostURL = "http://localhost:5173";
export const imageURL = "/src/assets/images/blog-images/";

const client = axios.create({
  baseURL,
});

export const getArticle = async (id: number) => {
  try {
    const response = await client.get(`/articles/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComments = async (articleId: number) => {
  try {
    const response = await client.get(`/comments?articleId=${articleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArticles = async () => {
  try {
    const response = await client.get("/articles");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postComment = async (data:{articleId:number, body:string}) => {
  try {
    const response = await client.post("/comments", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addArticle = async (data: any) => {
  try {
    const response = await client.post("/articles", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateArticle = async (
  id: number,
  data: { title: string; body: string }
) => {
  try {
    const response = await client.patch(`/articles/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (id: number) => {
  try {
    const response = await client.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const deleteComment = async (id: number) => {
  try {
    const response = await client.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const fetchData = async () => {
//   const result = await axios(baseURL);
//   return result.data;
// };


// export const patchComment = async (id: number, data: any) => {
//   try {
//     const response = await client.patch(`/comments/${id}`, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

