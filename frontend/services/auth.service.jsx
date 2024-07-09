import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_API_URL;

export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/user/register`, {
      email,
      password,
    });

    const data = await res.data;

    if (res.status === 201) {
      // localStorage.setItem("token", data.token);
      Cookies.set("token", data.token, { expires: 1 }, { sameSite: "Strict" })
      console.log("User registered successfully", data);
    } else {
      console.error("Registration failed", data);
    }
  } catch (error) {
    console.error("Registration failed", error);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });

    const data = await res.data;

    if (res.status === 201) {
      // localStorage.setItem("token", data.token);
      Cookies.set("token", data.token, { expires: 1 }, { sameSite: "Strict" });
      console.log("User logged in successfully", data);
    } else {
      console.error("Login failed", data);
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.message ? error : new Error("This user couldn't be found"); // Throw the specific error message
    } else {
      return error.message
        ? error
        : new Error("An error occurred during login"); // Throw a generic error message
    }
  }
};

export const updatePassword = async (newPassword) => {
    try {
        // const token = localStorage.getItem("token");
        const token = Cookies.get("token");
    
        const res = await axios.put(
        `${API_URL}/user/update-password`,
        { newPassword },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
    
        const data = await res.data;
    
        if (res.status === 200) {
        console.log("Password updated successfully", data);
        } else {
        console.error("Password update failed", data);
        }
    } catch (error) {
        console.error("Password update failed", error);
    }
    }

