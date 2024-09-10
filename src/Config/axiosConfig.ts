import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true, // Ensures credentials are sent
});

// Request interceptor to add the accessToken to the headers
api.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to refresh token if it's expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
          { refreshToken }, // Sending the refresh token to get a new access token
          { withCredentials: true }
        );

        Cookies.set('accessToken', data.accessToken); // Set the new accessToken
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest); // Retry the original request
      } catch (err) {
        console.log('Refresh token expired or invalid. Please login again.');
        // Redirect to login page or handle logout logic here
      }
    }
    return Promise.reject(error);
  }
);

export default api;
