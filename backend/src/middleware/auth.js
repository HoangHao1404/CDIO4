// ==================================================
// AUTHENTICATION MIDDLEWARE
// ==================================================
// Middleware để verify JWT token và authorize user roles

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==================================================
// PROTECT MIDDLEWARE - VERIFY JWT TOKEN
// ==================================================
export const protect = async (req, res, next) => {
  try {
    let token;

    // Kiểm tra Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token từ "Bearer TOKEN"
      token = req.headers.authorization.split(" ")[1];
    }

    // Kiểm tra token có tồn tại không
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          message: "Access denied. No token provided",
        },
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user từ token payload
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            message: "Token invalid. User not found",
          },
        });
      }

      // Kiểm tra user có active không
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: {
            message: "User account is deactivated",
          },
        });
      }

      // Gắn user info vào request object
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("❌ Token verification error:", error.message);

      // Xử lý các loại lỗi JWT khác nhau
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          error: {
            message: "Token expired",
          },
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          error: {
            message: "Invalid token",
          },
        });
      }

      return res.status(401).json({
        success: false,
        error: {
          message: "Token verification failed",
        },
      });
    }
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      error: {
        message: "Authentication error",
      },
    });
  }
};

// ==================================================
// AUTHORIZE MIDDLEWARE - CHECK USER ROLES
// ==================================================
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Middleware này chạy sau protect middleware
    // nên req.user đã được set

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          message: "Access denied. Please login first",
        },
      });
    }

    // Kiểm tra user role có trong danh sách allowed roles không
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          message: `Access denied. Required role: ${roles.join(" or ")}`,
        },
      });
    }

    next();
  };
};

// ==================================================
// OPTIONAL MIDDLEWARE - CHECK OWNERSHIP
// ==================================================
export const checkOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;
    const userRole = req.user.role;

    // Admin có thể access tất cả
    if (userRole === "admin") {
      return next();
    }

    // User chỉ có thể access own profile
    if (id !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: "Access denied. You can only access your own profile",
        },
      });
    }

    next();
  } catch (error) {
    console.error("❌ Ownership check error:", error);
    return res.status(500).json({
      success: false,
      error: {
        message: "Authorization error",
      },
    });
  }
};
