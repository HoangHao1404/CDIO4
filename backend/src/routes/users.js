// ==================================================
// USER MANAGEMENT ROUTES
// ==================================================
// Các endpoint quản lý user: CRUD operations
// Base URL: /api/users

import express from "express";
import { body, param } from "express-validator";

// Import controllers
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// Import middleware
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// ==================================================
// VALIDATION RULES
// ==================================================

// Validation cho update user
const updateUserValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
];

// Validation cho user ID parameter
const userIdValidation = [
  param("id").isMongoId().withMessage("Invalid user ID format"),
];

// ==================================================
// ROUTES DEFINITION
// ==================================================

// Tất cả routes đều cần authentication
router.use(protect);

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get("/", authorize("admin"), getUsers);

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private (own profile) / Admin (any profile)
router.get("/:id", userIdValidation, getUser);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (own profile) / Admin (any profile)
router.put("/:id", userIdValidation, updateUserValidation, updateUser);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete("/:id", userIdValidation, authorize("admin"), deleteUser);

// ==================================================
// ADDITIONAL ROUTES (có thể implement sau)
// ==================================================

// @desc    Upload user avatar
// @route   PUT /api/users/:id/avatar
// @access  Private
// router.put('/:id/avatar', userIdValidation, uploadAvatar);

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private/Admin
// router.get('/stats', authorize('admin'), getUserStats);

export default router;
