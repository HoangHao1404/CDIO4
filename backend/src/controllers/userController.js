// ==================================================
// USER CONTROLLER - XỬ LÝ USER MANAGEMENT LOGIC
// ==================================================
// Chứa các hàm xử lý CRUD operations cho users

import { validationResult } from "express-validator";
import User from "../models/User.js";

// ==================================================
// CONTROLLER FUNCTIONS
// ==================================================

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    // Query parameters for pagination và filtering
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter options
    const filter = {};

    // Filter by role nếu có
    if (req.query.role) {
      filter.role = req.query.role;
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    }

    // Search by name hoặc email
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Get users với pagination
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count total documents
    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          pages: Math.ceil(total / limit),
          limit,
          total,
        },
      },
    });
  } catch (error) {
    console.error("❌ Get users error:", error);
    next(error);
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private (own profile) / Admin (any profile)
export const getUser = async (req, res, next) => {
  try {
    // Kiểm tra validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid user ID format",
          details: errors.array(),
        },
      });
    }

    const { id } = req.params;
    const currentUserId = req.user.id;
    const userRole = req.user.role;

    // Kiểm tra permission: chỉ admin hoặc chính user đó
    if (userRole !== "admin" && id !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: "Access denied. You can only view your own profile",
        },
      });
    }

    const user = await User.findById(id).select("-password");

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
        user,
      },
    });
  } catch (error) {
    console.error("❌ Get user error:", error);
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (own profile) / Admin (any profile)
export const updateUser = async (req, res, next) => {
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

    const { id } = req.params;
    const currentUserId = req.user.id;
    const userRole = req.user.role;
    const { name, email, avatar } = req.body;

    // Kiểm tra permission: chỉ admin hoặc chính user đó
    if (userRole !== "admin" && id !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: "Access denied. You can only update your own profile",
        },
      });
    }

    // Kiểm tra user có tồn tại không
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          message: "User not found",
        },
      });
    }

    // Kiểm tra email đã tồn tại chưa (nếu thay đổi email)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: {
            message: "Email already exists",
          },
        });
      }
    }

    // Cập nhật thông tin
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (avatar !== undefined) updateData.avatar = avatar;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    // Log để debug (chỉ trong development)
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ User updated: ${updatedUser.email}`);
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("❌ Update user error:", error);
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    // Kiểm tra validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid user ID format",
          details: errors.array(),
        },
      });
    }

    const { id } = req.params;
    const currentUserId = req.user.id;

    // Không cho phép user tự xóa chính mình
    if (id === currentUserId.toString()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "You cannot delete your own account",
        },
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          message: "User not found",
        },
      });
    }

    // Soft delete: set isActive = false thay vì xóa hẳn
    await User.findByIdAndUpdate(id, { isActive: false });

    // Hoặc hard delete nếu muốn:
    // await User.findByIdAndDelete(id);

    // Log để debug (chỉ trong development)
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ User deactivated: ${user.email}`);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete user error:", error);
    next(error);
  }
};

// ==================================================
// ADDITIONAL FUNCTIONS (có thể implement sau)
// ==================================================

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: "admin" });

    // Users registered this month
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const thisMonthUsers = await User.countDocuments({
      createdAt: { $gte: thisMonth },
    });

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          activeUsers,
          adminUsers,
          thisMonthUsers,
          inactiveUsers: totalUsers - activeUsers,
        },
      },
    });
  } catch (error) {
    console.error("❌ Get user stats error:", error);
    next(error);
  }
};
