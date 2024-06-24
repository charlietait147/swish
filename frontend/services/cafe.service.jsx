import axios from "axios";

const API_URL = process.env.NEXT_API_URL;

export const getCafes = async () => {
    try {
        const res = await axios.get(`${API_URL}/cafes`);
        console.log("Cafes fetched successfully", res.data);
    } catch (error) {
        console.error("Cafes fetch failed", error);
    }
    }

export const getCafe = async (cafeId) => {
    try {
        const res = await axios.get(`${API_URL}/cafes/${cafeId}`);
        console.log("Cafe fetched successfully", res.data);
    } catch (error) {
        console.error("Cafe fetch failed", error);
    }
    }