import axios from "axios";

const API_URL = process.env.NEXT_API_URL || "http://localhost:3000";;

export const fetchCafes = async () => {
    try {
        const res = await axios.get(`${API_URL}/cafes`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error(error.response?.data)// Throw the specific error message
           }
           else {
             throw new Error(error.message || "An error occurred during fetching cafes");
           }
    }
    }

export const fetchCafe = async (cafeId) => {
    if (!cafeId) {
        throw new Error("No cafeId provided");
    }
    try {
        const res = await axios.get(`${API_URL}/cafes/${cafeId}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error(error.response?.data)// Throw the specific error message
           }
           else {
             throw new Error(error.message || "An error occurred during fetching cafes");
           }
    }
    }