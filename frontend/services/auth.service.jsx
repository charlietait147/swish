import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_API_URL || "http://localhost:3000";

export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/user/register`, {
      email,
      password,
    });

    const data = await res.data;

    if (res.status === 201) {
      Cookies.set("token", data.token, { expires: 1 }, { sameSite: "Strict" });
      console.log("User registered successfully");
      return data;
    } else {
      throw new Error(data.message || ("Registration failed"));
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
     throw new Error(error.response.data)// Throw the specific error message
    }
    else {
      throw new Error(error.message || "An error occurred during registration");
    }
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
      Cookies.set("token", data.token, { expires: 1 }, { sameSite: "Strict" });
      console.log("User logged in successfully");
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data)// Throw the specific error message
    } else {
      throw new Error(error.message || "An error occurred during login");
    }
  }
};

export const updatePassword = async (newPassword) => {
  try {
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
      return data;
    } else {
      throw new Error(data.message || "Password update failed");
    }
  } catch (error) {
    throw new Error(error.response?.data || "An error occurred during password update");
  }
};
