// ==================================================
// AUTHENTICATION ROUTES
// ==================================================
// Các endpoint liên quan đến authentication: register, login, logout
// Base URL: /api/auth

import express from "express";
import { body } from "express-validator";

// Import controllers (sẽ tạo sau)
import {
  register,
  login,
  getProfile,
  logout,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js"; // Middleware xác thực JWT

const router = express.Router();

// ==================================================
// VALIDATION RULES
// ==================================================

// Validation cho register
const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation cho login
const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

// ==================================================
// ROUTES DEFINITION
// ==================================================

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post("/register", registerValidation, register);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post("/login", loginValidation, login);

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private (cần JWT token)
router.get("/me", protect, getProfile);

// @desc    Logout user (clear token)
// @route   POST /api/auth/logout
// @access  Private
router.post("/logout", protect, logout);

// ==================================================
// ADDITIONAL ROUTES (có thể implement sau)
// ==================================================

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
// router.post('/forgot-password', forgotPassword);

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
// router.put('/reset-password/:token', resetPassword);

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
// router.put('/update-password', protect, updatePassword);

export default router;
