// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../context/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Attach JWT for every API request
  API.interceptors.request.use((config) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.token)
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    return config;
  });

  const login = async (username, password) => {
    try {
      const res = await API.post("/auth/login", { username, password });
      const loggedUser = {
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
        token: res.data.token,
      };

      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      // ✅ Navigate by role
      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "bot") navigate("/bot");
      else navigate("/applicant");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored && !user) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
