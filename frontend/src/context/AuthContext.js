import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Cấu hình axios theo hướng dẫn dự án - đọc từ .env
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
  withCredentials: true,
  timeout: 10000,
});

// Interceptor debug theo quy chuẩn tiếng Việt
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Gọi API: ${config.method?.toUpperCase()} ${config.url}`);
    console.log(`📤 Dữ liệu gửi:`, config.data);
    return config;
  },
  (error) => {
    console.error("❌ Lỗi yêu cầu:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Phản hồi thành công:`, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Lỗi phản hồi:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Kiểm tra xác thực từ localStorage khi app khởi động
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("❌ Lỗi khi parse dữ liệu user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // Hàm đăng ký với error handling chi tiết
  const register = async (userData) => {
    try {
      setError("");
      setLoading(true);

      console.log("📝 Bắt đầu đăng ký với dữ liệu:", userData);

      const response = await api.post("/auth/register", userData);

      if (response.data.success) {
        console.log("✅ Đăng ký thành công:", response.data.message);
        return {
          success: true,
          message: response.data.message,
        };
      }

      return {
        success: false,
        error: response.data.error || "Đăng ký thất bại",
      };
    } catch (error) {
      console.error("❌ Chi tiết lỗi đăng ký:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });

      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";

      // Xử lý lỗi theo hướng dẫn dự án
      if (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED") {
        errorMessage =
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra backend server có chạy trên port 5001 không.";
      } else if (error.code === "ERR_FAILED") {
        errorMessage =
          "Kết nối thất bại. Kiểm tra máy chủ backend và cấu hình CORS.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng nhập tương tự
  const login = async (email, password) => {
    try {
      setError("");
      setLoading(true);

      console.log("🔐 Bắt đầu đăng nhập với email:", email);

      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        const { token, data } = response.data;

        // Lưu theo chuẩn dự án
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
        setIsAuthenticated(true);

        console.log("✅ Đăng nhập thành công:", data.user.name);
        return { success: true, user: data.user };
      }

      return {
        success: false,
        error: response.data.error || "Đăng nhập thất bại",
      };
    } catch (error) {
      console.error("❌ Chi tiết lỗi đăng nhập:", error);

      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại.";
      if (error.code === "ERR_NETWORK") {
        errorMessage =
          "Không thể kết nối đến máy chủ. Kiểm tra backend server.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setError("");
    console.log("✅ Đăng xuất thành công");
  };

  const clearError = () => setError("");

  const value = {
    user,
    loading,
    isAuthenticated,
    error,
    register,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};
