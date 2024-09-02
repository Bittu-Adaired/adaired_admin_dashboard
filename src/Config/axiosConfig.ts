import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Set your base URL here
  withCredentials: true, // Allow sending cookies with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can also add any additional headers here if needed
    // Log the request payload (data)
    if (config.data) {
      console.log("Request Payload:", config.data);
    }

    // Log the request cookies (headers)
    if (config.headers) {
      console.log("Request Cookies:", config.headers["Cookies"]);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
