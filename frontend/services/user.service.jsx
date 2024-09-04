import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_API_URL || "http://localhost:3000";

export const addCafe = async (cafeId) => {
  try {
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
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response?.data)// Throw the specific error message
     }
     else {
       throw new Error(error.message || "An error occurred adding a cafe");
     }
  }
};

export const getCafes = async () => {
  try {
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
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response?.data)// Throw the specific error message
     }
     else {
       throw new Error(error.message || "An error occurred adding a cafe");
     }
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
    if (error.response && error.response.status === 400) {
      throw new Error(error.response?.data)// Throw the specific error message
     }
     else {
       throw new Error(error.message || "An error occurred adding a cafe");
     }
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
    if (error.response && error.response.status === 400) {
      throw new Error(error.response?.data)// Throw the specific error message
     }
     else {
       throw new Error(error.message || "An error occurred adding a cafe");
     }
  }
}

export const deleteSavedCafe = async (cafeId) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const res = await axios.delete(`${API_URL}/user/${cafeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cafe deleted successfully", res.data);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response?.data)// Throw the specific error message
     }
     else {
       throw new Error(error.message || "An error occurred adding a cafe");
     }
  }
}
