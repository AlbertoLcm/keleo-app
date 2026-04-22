import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1/` : "https://api.keleo.app/api/v1/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
