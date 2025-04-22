import axios from "axios";

const API_URL = "https://pawpal-backend-1.onrender.com/api/categories";
const PET_API_URL = "https://pawpal-backend-1.onrender.com/api/pets";
// const API_URL = "http://192.168.1.10:8080/api/categories";
// const PET_API_URL = "http://192.168.1.10:8080/api/pets";

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch categories";
  }
};
export const getPetsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${PET_API_URL}/${categoryId}`);
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch pets";
  }
};