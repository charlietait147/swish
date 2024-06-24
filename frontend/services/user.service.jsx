import axios from "axios";

const API_URL = process.env.NEXT_API_URL;

export const addCafe = async (cafeId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const res = await axios.post(
      `${API_URL}/user/add-cafe/${cafeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Cafe added successfully", res.data);
  } catch (error) {
    console.error("Cafe addition failed", error);
  }
};

export const getCafes = async () => {
    try {
        const token = localStorage.getItem("token");
    
        if (!token) {
        throw new Error("No token found. Please log in.");
        }
    
        const res = await axios.get(`${API_URL}/user/cafes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log("Cafes fetched successfully", res.data);
    } catch (error) {
        console.error("Cafes fetch failed", error);
    }
    }
