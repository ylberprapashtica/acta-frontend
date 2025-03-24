import axios from 'axios';
import { authService } from './auth.service';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

instance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance; 