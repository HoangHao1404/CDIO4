// ==================================================
// API SERVICE FOR AUTHENTICATION
// ==================================================
import axios from "axios";

// Ưu tiên env, fallback localhost:5001/api
const API_BASE_URL =
  process.env.REACT_APP_API_BASE ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) ||
  "http://localhost:5001/api";

// Axios instance (QUAN TRỌNG: withCredentials để gửi/nhận cookie JWT)
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// (Optional) Nếu sau này mày muốn thêm Bearer token thủ công
// thì bật lại đoạn dưới. Hiện tại ta DÙNG COOKIE nên không cần.
/*
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
*/

// Response interceptor - Xử lý lỗi chung
// KHÔNG redirect ở đây, để AuthContext xử lý
api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

// ==================================================
// AUTH API
// ==================================================
export const register = (userData) => api.post("/auth/register", userData);
export const login = (credentials) => api.post("/auth/login", credentials);
export const getProfile = () => api.get("/auth/me");
export const logout = () => api.post("/auth/logout");

// (chưa dùng) Forgot/Reset/Update password
export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  api.put(`/auth/reset-password/${token}`, { password });
export const updatePassword = (passwords) =>
  api.put("/auth/update-password", passwords);

export default api;
