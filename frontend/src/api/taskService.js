import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const taskService = {
  getAllTasks: async () => {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;
  },
  
  createTask: async (task) => {
    const response = await axios.post(`${API_URL}/tasks/`, task);
    return response.data;
  },
  
  updateTask: async (id, task) => {
    const response = await axios.put(`${API_URL}/tasks/${id}/`, task);
    return response.data;
  },
  
  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}/`);
    return response.data;
  },
  
  completeTask: async (id) => {
    const response = await axios.post(`${API_URL}/tasks/${id}/complete/`);
    return response.data;
  },
  
  updateStatuses: async () => {
    const response = await axios.get(`${API_URL}/tasks/update_statuses/`);
    return response.data;
  }
};

export default taskService;