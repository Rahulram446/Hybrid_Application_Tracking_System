// frontend/src/context/axios.js
import axios from "axios";

// ✅ Create a pre-configured Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000/api", // change if backend uses a different port
});

// ✅ Automatically attach JWT token (if logged in)
instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;
