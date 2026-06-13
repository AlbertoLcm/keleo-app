import axios from "axios";

const baseURL = "https://api.keleo.app/api/v1/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
