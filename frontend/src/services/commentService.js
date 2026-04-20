import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For cookies
});

export const commentService = {
  getCommentsByTask: async (taskId) => {
    const response = await api.get(`/comments/task/${taskId}`);
    return response.data;
  },

  createComment: async (taskId, text) => {
    const response = await api.post(`/comments/task/${taskId}`, { text });
    return response.data;
  },
};

export default commentService;