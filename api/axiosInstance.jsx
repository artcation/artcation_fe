import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: '/backend',
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const skipUrls = ['/auth/token/refresh', '/auth/verify-code', '/auth/signup', '/auth/login', '/auth/password-reset/request', '/auth/password-reset/confirm'];
    const originalRequest = error.config;

    if (error.response?.status == 401 && !originalRequest._retried && !skipUrls.includes(originalRequest.url)) {
      originalRequest._retried = true;
      await axiosInstance.post('/auth/token/refresh');
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;