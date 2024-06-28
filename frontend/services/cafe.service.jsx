import axios from "axios";

const API_URL = process.env.NEXT_API_URL;

export const fetchCafes = async () => {
    try {
        const res = await axios.get(`${API_URL}/cafes`);
        return res.data;
    } catch (error) {
        return error.message;
    }
    }

export const fetchCafe = async (cafeId) => {
    try {
        const res = await axios.get(`${API_URL}/cafes/${cafeId}`);
        return res.data;
    } catch (error) {
        return error.message;
    }
    }