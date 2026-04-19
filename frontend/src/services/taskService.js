import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For cookies
});

export const taskService = {
  getTasksByProject: async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  moveTask: async (taskId, status) => {
    const response = await api.put(`/tasks/${taskId}/move`, { status });
    return response.data;
  },

  assignUserToTask: async (taskId, userId) => {
    const response = await api.put(`/tasks/${taskId}/assign`, { userId });
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },
};

export default taskService;