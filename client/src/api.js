import axios from 'axios';

const API_URL = 'https://crud-app-zp8o.onrender.com/api/items';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllItems = () => apiClient.get('/');
export const getItemById = (id) => apiClient.get(`/${id}`);
export const createItem = (item) => apiClient.post('/', item);
export const updateItem = (id, item) => apiClient.put(`/${id}`, item);
export const deleteItem = (id) => apiClient.delete(`/${id}`);

export default apiClient;
