import axios from "axios";

const API_URL = "http://192.168.1.10:8080/api/pets"; 

export const getPetsByCategory = async (category) => {
  try {
    const res = await axios.get(`${API_URL}/category/${category}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error.response?.data?.message || "Failed to fetch pets";
  }
};
