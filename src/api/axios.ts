import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.251:3000/api/v1/",
  // baseURL: "http://192.168.0.88:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
