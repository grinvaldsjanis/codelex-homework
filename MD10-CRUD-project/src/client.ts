import axios from 'axios';

const baseUrl = "http://localhost:3004/";


export const getCardsData = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}data`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCardData = async (id: number): Promise<void> => {
    try {
        const res = await axios.get(`${baseUrl}data/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCardData = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${baseUrl}data/${id}`);
    } catch (error) {
        console.error(error);
    }
};

export const editCardData = async (id: number, card: object): Promise<void> => {
    try {
        await axios.put(`${baseUrl}data/${id}`, card);
    } catch (error) {
        console.error(error);
    }
};

export const postCardData = async (card: object): Promise<void> => {
    try {
        await axios.post(`${baseUrl}data`, card);
    } catch (error) {
        console.error(error);
    }
};

