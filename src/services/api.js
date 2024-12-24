import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Cambia esta URL si el backend tiene otra dirección
});

// Interceptor para agregar el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
