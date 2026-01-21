
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const analyzeUrl = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/analyze-url`, { url });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Network Error' };
  }
};

export const analyzeMessage = async (text, type = 'text') => {
  try {
    const response = await axios.post(`${API_URL}/analyze-message`, { text, type });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Network Error' };
  }
};

export const checkIdentity = async (email, username) => {
  try {
    const response = await axios.post(`${API_URL}/check-identity`, { email, username });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Network Error' };
  }
};
