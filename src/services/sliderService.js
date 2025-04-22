import axios from "axios";

const API_URL = "http://192.168.1.10:8080/api/sliders"; 
export const getSliders = async () => {                                                                                 
  try {
    const res = await axios.get(`${API_URL}`);
    console.log("Sliderssss: ", res.data)
    return res.data; 
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch sliders";
  }
};

export const addSlider = async (imageUrl) => {
  try {
    const res = await axios.post(`${API_URL}/add`, { imageUrl });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to add slider";
  }
};

export const deleteSlider = async (sliderId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete/${sliderId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete slider";
  }
};
