import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Set your base URL here
  withCredentials: true, // Allow sending cookies with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can also add any additional headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
