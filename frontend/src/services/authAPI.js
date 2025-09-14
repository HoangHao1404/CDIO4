// ==================================================
// API SERVICE FOR AUTHENTICATION
// ==================================================
// Tất cả các API calls liên quan đến authentication
// Sử dụng axios để gọi backend APIs

import axios from "axios";

// Base URL cho API (được proxy trong package.json)
const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

// ==================================================
// AXIOS INSTANCE CONFIGURATION
// ==================================================
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Thêm token vào mọi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu token hết hạn, redirect về login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ==================================================
// AUTH API FUNCTIONS
// ==================================================

// Register new user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response;
};

// Get user profile
export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response;
};

// Logout user
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response;
};

// ==================================================
// ADDITIONAL AUTH FUNCTIONS (implement sau nếu cần)
// ==================================================

// Forgot password
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await api.put(`/auth/reset-password/${token}`, { password });
  return response;
};

// Update password
export const updatePassword = async (passwords) => {
  const response = await api.put("/auth/update-password", passwords);
  return response;
};

export default api;
