import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_API_URL || "http://localhost:3000";

const setAuthCookie = (token) => {
  Cookies.set("token", token, { expires: 1, sameSite: "Strict" });
};

// The API replies with plain text, a list of validation messages, or { error } / { errors }
const getErrorMessage = (error, fallback) => {
  const data = error?.response?.data;
  if (typeof data === "string" && data) return data;
  if (Array.isArray(data) && data.length) return data[0];
  return data?.error || data?.errors?.[0] || data?.message || error?.message || fallback;
};

export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/user/register`, {
      email,
      password,
    });

    const data = await res.data;

    if (res.status === 201) {
      setAuthCookie(data.token);
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
      setAuthCookie(data.token);
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

    const { data } = await axios.put(
      `${API_URL}/user/update-password`,
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Changing the password invalidates the old token, so store the new one
    setAuthCookie(data.token);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "An error occurred during password update"));
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(`${API_URL}/user/forgot-password`, {
      email,
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Password reset failed"));
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/user/reset-password/${token}`,
      { newPassword }
    );

    // The API signs the user in with their new password
    setAuthCookie(data.token);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Password reset failed"));
  }
};
