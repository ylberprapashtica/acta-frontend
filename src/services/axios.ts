import axios from 'axios';
import { authService } from './AuthService';
import { getAPIUrl } from '../config';

// Initialize with a default URL, will be updated on first request
const instance = axios.create({
  baseURL: getAPIUrl(),
});

// Update baseURL dynamically in case it changes
instance.interceptors.request.use(
  (config) => {
    try {
      // Update baseURL on each request to ensure it's current
      const apiUrl = getAPIUrl();
      config.baseURL = apiUrl;
      console.log('[Axios] Request to:', config.baseURL + config.url);
    } catch (error) {
      console.error('[Axios] Error getting API URL:', error);
    }
    
    // Skip adding Authorization header for login endpoint
    if (config.url === '/auth/login') {
      return config;
    }
    
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
    // Log error details for debugging
    console.error('[Axios] Request error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    // Only redirect to login on 401, and only if not already on login page
    if (error.response?.status === 401) {
      // Don't redirect if we're already on the login page (prevents redirect loops)
      if (!window.location.pathname.includes('/login')) {
        authService.logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 