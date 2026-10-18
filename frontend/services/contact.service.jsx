import axios from "axios";

const API_URL = process.env.NEXT_API_URL || "http://localhost:3000";

export const sendContactMessage = async ({ firstName, lastName, email, message }) => {
  try {
    const res = await axios.post(`${API_URL}/contact`, {
      firstName,
      lastName,
      email,
      message,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Validation errors come back as an array of messages
      const data = error.response.data;
      throw new Error(Array.isArray(data) ? data.join(" ") : data);
    } else {
      throw new Error(
        error.response?.data || "Sorry, your message couldn't be sent. Please try again later."
      );
    }
  }
};
