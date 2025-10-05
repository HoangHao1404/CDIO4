import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// ====================
// Cấu hình Axios chung
// ====================
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log(`📤 Body gửi:`, config.data);
    return config;
  },
  (error) => {
    console.error("❌ Lỗi request:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    console.log(`✅ Response từ server:`, res.data);
    return res;
  },
  (err) => {
    console.error("❌ Response error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

// ====================
// Context Provider
// ====================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Khi reload, kiểm tra dữ liệu user trong localStorage
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
        console.log("🔁 Đã tải user từ localStorage:", parsed);
      } catch (err) {
        console.error("❌ Lỗi parse user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ==========================================
  // Đăng ký
  // ==========================================
  const register = async (userData) => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/register", userData);
      if (res.data.success) {
        return { success: true, message: res.data.message };
      }

      return { success: false, error: res.data.error || "Đăng ký thất bại" };
    } catch (err) {
      console.error("❌ Lỗi đăng ký:", err);
      let msg = "Không thể đăng ký. Vui lòng thử lại.";
      if (err.response?.data?.error?.message) msg = err.response.data.error.message;
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Đăng nhập
  // ==========================================
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError("");

      console.log("🔐 Đăng nhập bằng:", email);

      const res = await api.post("/auth/login", { email, password });

      if (res.data.success) {
        const { token, data } = res.data;
        const userData = data.user;

        // 🧠 Nếu backend trả về "role": ["Admin"], ta lấy phần tử đầu tiên
        const role = Array.isArray(userData.role)
          ? userData.role[0]
          : userData.role || "User";

        // ✅ Đồng bộ vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ ...userData, role }));

        setUser({ ...userData, role });
        setIsAuthenticated(true);

        console.log(`✅ Đăng nhập thành công với quyền: ${role}`);

        return {
          success: true,
          user: { ...userData, role },
          redirect: role === "Admin" ? "/admin/users" : "/dashboard",
        };
      }

      return {
        success: false,
        error: res.data.error || "Đăng nhập thất bại",
      };
    } catch (err) {
      console.error("❌ Chi tiết lỗi đăng nhập:", err);

      let msg = "Đăng nhập thất bại. Vui lòng thử lại.";
      if (err.code === "ERR_NETWORK") {
        msg = "Không thể kết nối đến máy chủ backend.";
      } else if (err.response?.data?.error?.message) {
        msg = err.response.data.error.message;
      }

      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Đăng xuất
  // ==========================================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    console.log("🚪 Đã đăng xuất");
  };

  const clearError = () => setError("");

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ====================
// Hook sử dụng
// ====================
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải dùng trong AuthProvider");
  return ctx;
};
