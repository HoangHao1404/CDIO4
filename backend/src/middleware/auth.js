// ==================================================
// JWT Protect & Role Middleware
// ==================================================
import jwt from "jsonwebtoken";

const COOKIE_NAME = process.env.COOKIE_NAME || "token";

/**
 * Đọc token từ Cookie (ưu tiên) hoặc Header Authorization
 */
export const protect = (req, res, next) => {
  try {
    let token = req.cookies?.[COOKIE_NAME];
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
      return res
        .status(401)
        .json({ success: false, error: { message: "Unauthorized" } });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.userId || decoded.sub,
      roles: decoded.roles,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, error: { message: "Invalid or expired token" } });
  }
};

export const authorize =
  (...roles) =>
  (req, res, next) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return res
        .status(403)
        .json({ success: false, error: { message: "Forbidden" } });
    }
    next();
  };
