import axios from "axios";

// const API_URL = "http://192.168.1.10:8080/api/favorites";
const API_URL = "https://pawpal-backend-1.onrender.com/api/favorites";

export const getFavoritePets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite pets:", error);
    throw error.response?.data?.message || "Failed to fetch favorite pets";
  }
};
export const addToFavorites = async (petId) => {
  try {
    const response = await axios.post(API_URL, { petId });
    return response.data;
  } catch (error) {
    console.error("Error adding pet to favorites:", error);
    throw error.response?.data?.message || "Failed to add pet to favorites";
  }
};
export const removeFavorite = async (petId) => {
  try {
    const response = await axios.delete(`${API_URL}/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing pet from favorites:", error);
    throw error.response?.data?.message || "Failed to remove pet from favorites";
  }
};
export const checkIfFavorite = async (petId) => {
  try {
    const response = await axios.get(`${API_URL}/check/${petId}`);
    return response.data.isFavorite;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false; 
  }
};
