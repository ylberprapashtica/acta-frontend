import axiosInstance from './axios';

export const getHello = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default axiosInstance; 