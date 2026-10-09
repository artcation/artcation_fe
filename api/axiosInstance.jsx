import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: '/backend',
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status == 401 && !originalRequest._retried && originalRequest.url !== '/auth/token/refresh') {
      originalRequest._retried = true;
      await axiosInstance.post('/auth/token/refresh');
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;