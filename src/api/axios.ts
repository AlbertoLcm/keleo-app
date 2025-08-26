import axios from "axios";

const baseURL = "https://api.keleo.app/api/v1/";
// const baseURL = "http://10.250.176.182:3000/api/v1/"

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
