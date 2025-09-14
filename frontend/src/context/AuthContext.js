// ==================================================
// AUTH CONTEXT - QUẢN LÝ TRẠNG THÁI AUTHENTICATION
// ==================================================
// Context để chia sẻ thông tin user và auth state trong toàn bộ app
// Sử dụng React Context API

import React, { createContext, useContext, useReducer, useEffect } from "react";
import * as authAPI from "../services/authAPI";

// Tạo Auth Context
const AuthContext = createContext();

// ==================================================
// AUTH REDUCER - QUẢN LÝ STATE CHANGES
// ==================================================
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };

    case "LOAD_USER":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// ==================================================
// INITIAL STATE
// ==================================================
const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
  error: null,
};

// ==================================================
// AUTH PROVIDER COMPONENT
// ==================================================
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ==================================================
  // LOAD USER WHEN APP STARTS
  // ==================================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser();
    } else {
      dispatch({ type: "LOGIN_FAILURE", payload: "No token found" });
    }
  }, []);

  // ==================================================
  // ACTION FUNCTIONS
  // ==================================================

  // Load user profile
  const loadUser = async () => {
    try {
      const response = await authAPI.getProfile();
      dispatch({ type: "LOAD_USER", payload: response.data.user });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      localStorage.removeItem("token");
    }
  };

  // Login user
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await authAPI.login({ email, password });

      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.error?.message || "Login failed",
      });
      return { success: false, error: error.response?.data?.error?.message };
    }
  };

  // Register user
  const register = async (userData) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await authAPI.register(userData);

      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.error?.message || "Registration failed",
      });
      return { success: false, error: error.response?.data?.error?.message };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // ==================================================
  // CONTEXT VALUE
  // ==================================================
  const value = {
    ...state,
    login,
    register,
    logout,
    loadUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ==================================================
// CUSTOM HOOK TO USE AUTH CONTEXT
// ==================================================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
