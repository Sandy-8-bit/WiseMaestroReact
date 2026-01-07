import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SUPABASE_URL || "http://localhost:3000",
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
