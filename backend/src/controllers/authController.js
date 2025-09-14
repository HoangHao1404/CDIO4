// ==================================================
// AUTH CONTROLLER - XỬ LÝ AUTHENTICATION LOGIC
// ==================================================
// Chứa các hàm xử lý logic cho authentication endpoints
// register, login, getProfile, logout

import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==================================================
// HELPER FUNCTIONS
// ==================================================

// Tạo JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Gửi response với token
const sendTokenResponse = (user, statusCode, res, message = "Success") => {
  // Tạo token
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    message,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    },
  });
};

// ==================================================
// CONTROLLER FUNCTIONS
// ==================================================

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    // Kiểm tra validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Validation failed",
          details: errors.array(),
        },
      });
    }

    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Email already exists",
        },
      });
    }

    // Tạo user mới
    const user = await User.create({
      name,
      email,
      password,
    });

    // Log để debug (chỉ trong development)
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ New user registered: ${user.email}`);
    }

    // Trả về response với token
    sendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    console.error("❌ Register error:", error);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    // Kiểm tra validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Validation failed",
          details: errors.array(),
        },
      });
    }

    const { email, password } = req.body;

    // Tìm user và include password
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          message: "Invalid credentials",
        },
      });
    }

    // Kiểm tra password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        error: {
          message: "Invalid credentials",
        },
      });
    }

    // Cập nhật last login
    await user.updateLastLogin();

    // Log để debug (chỉ trong development)
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ User logged in: ${user.email}`);
    }

    // Trả về response với token
    sendTokenResponse(user, 200, res, "Login successful");
  } catch (error) {
    console.error("❌ Login error:", error);
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    // req.user đã được set bởi protect middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          message: "User not found",
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    console.error("❌ Get profile error:", error);
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    // Trong JWT, logout thường được handle ở client side
    // Nhưng có thể implement token blacklist nếu cần

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("❌ Logout error:", error);
    next(error);
  }
};

// ==================================================
// ADDITIONAL FUNCTIONS (có thể implement sau)
// ==================================================

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  // TODO: Implement forgot password logic
  res.status(200).json({
    success: true,
    message: "Forgot password feature coming soon",
  });
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res, next) => {
  // TODO: Implement reset password logic
  res.status(200).json({
    success: true,
    message: "Reset password feature coming soon",
  });
};
