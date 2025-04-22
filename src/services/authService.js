import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.10:8080/api/auth"; 

export const registerUser = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { name, email, password });
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    await AsyncStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return null;

    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
export const logoutUser = async () => {
  await AsyncStorage.removeItem("token");
};

