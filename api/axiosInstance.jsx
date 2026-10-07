import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: '/backend',
});

export default axiosInstance;