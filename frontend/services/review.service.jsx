import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_API_URL;

export const addReview = async (cafeId, name, description) => {
    try {
        // const token = localStorage.getItem("token");
        const token = Cookies.get("token");
    
        if (!token) {
        throw new Error("No token found. Please log in.");
        }
    
        const res = await axios.post(
        `${API_URL}/review/${cafeId}/add-review`,
        { name, description },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        console.log("Review added successfully", res.data);
    } catch (error) {
        console.error("Review addition failed", error);
    }
    }

    export const editReview = async (reviewId, name, description) => {
        try {
            // const token = localStorage.getItem("token");
            const token = Cookies.get("token");
        
            if (!token) {
            throw new Error("No token found. Please log in.");
            }
        
            const res = await axios.put(
            `${API_URL}/review/edit-review/${reviewId}`,
            { name, description },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log("Review edited successfully", res.data);
        } catch (error) {
            console.error("Review edit failed", error);
        }
        }

    export const deleteReview = async (reviewId) => {
        try {
            // const token = localStorage.getItem("token");
            const token = Cookies.get("token");
        
            if (!token) {
            throw new Error("No token found. Please log in.");
            }
        
            const res = await axios.delete(
            `${API_URL}/review/delete-review/${reviewId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log("Review deleted successfully", res.data);
        } catch (error) {
            console.error("Review deletion failed", error);
        }
        }