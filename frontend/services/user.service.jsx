import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_API_URL;

export const addCafe = async (cafeId) => {
  try {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");

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
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");

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
};

export const isCafeSaved = async (cafeId) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const res = await axios.get(`${API_URL}/user/isCafeSaved/${cafeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cafe saved status fetched successfully", res.data);
    return res.data.isSaved;
  } catch (error) {
    console.error("Cafe saved status fetch failed", error);
  }
}

export const fetchUserData = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const res = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User data fetched successfully", res.data);
    return res.data;
  } catch (error) {
    console.error("User data fetch failed", error);
  }
}
