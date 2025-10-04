// ==================================================
// AUTH CONTEXT - QUẢN LÝ TRẠNG THÁI AUTHENTICATION
// ==================================================
import React, { createContext, useContext, useReducer, useEffect } from "react";
import * as authAPI from "../services/authAPI";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "LOAD_USER":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Khi app load: thử lấy profile từ cookie JWT
  useEffect(() => {
    const load = async () => {
      try {
        const res = await authAPI.getProfile();
        // BE trả { success, data: { user } }
        dispatch({ type: "LOAD_USER", payload: res.data.data.user });
      } catch {
        dispatch({ type: "ERROR", payload: null }); // không lỗi to; coi như chưa đăng nhập
      }
    };
    load();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await authAPI.login({ email, password });
      // BE trả { success, message, data: { user, token } } và cookie HttpOnly
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.user });
      return { success: true };
    } catch (error) {
      const msg =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: msg });
      // dispatch({ type: "ERROR", payload: msg });
      return { success: false, error: msg };
    }
  };

  // Register KHÔNG auto-login (theo yêu cầu). FE sẽ điều hướng sang /signin.
  const register = async (userData) => {
    dispatch({ type: "LOADING" });
    try {
      await authAPI.register(userData);
      dispatch({ type: "ERROR", payload: null });
      return { success: true };
    } catch (error) {
      const msg =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        "Registration failed";
      dispatch({ type: "ERROR", payload: msg });
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
