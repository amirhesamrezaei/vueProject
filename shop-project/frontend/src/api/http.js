import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE + "/api",
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

export default http;
