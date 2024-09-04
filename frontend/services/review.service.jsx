import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_API_URL || "http://localhost:3000";


export const addReview = async (cafeId, formData) => {
    try {
        // const token = localStorage.getItem("token");
        const token = Cookies.get("token");
    
        if (!token) {
        throw new Error("No token found. Please log in.");
        }

        const res = await axios.post(
        `${API_URL}/review/${cafeId}/add-review`,
         formData,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            }
        }
        );
        console.log("Review added successfully", res.data);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error(error.response?.data)// Throw the specific error message
           }
           else {
             throw new Error(error.message || "An error occurred adding a review");
           }
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
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error(error.response?.data)// Throw the specific error message
               }
               else {
                 throw new Error(error.message || "An error occurred adding a review");
               }
        }
        }

    export const deleteReview = async (reviewId) => {
        try {
            if (!reviewId) {
                throw new Error("No review ID provided.");
            }

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
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error(error.response?.data)// Throw the specific error message
               }
               else {
                 throw new Error(error.message || "An error occurred adding a review");
               }
        }
        }