import axios from "axios";

const api = axios.create({
  // baseURL: "https://api.keleo.app/api/v1/",
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
