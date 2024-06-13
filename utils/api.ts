import axios from 'axios';
import { Post } from '../types';

interface PaginatedResponse {
  docs: Post[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
const API_URL = 'http://localhost:3000';

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signUpUser`, { name, email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signInUser`, { email, password });
  return response.data;
};

export const getAllPosts = async () => {
  const token = localStorage.getItem('token') ?? '';
  try {
    const response = await axios.get(`${API_URL}/getAll/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    throw error;
  }
};
