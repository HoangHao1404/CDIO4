// ==================================================
// AUTH CONTROLLER
// ==================================================
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import TaiKhoan from "../models/TaiKhoan.js"; // ✅ Đúng model mới

const COOKIE_NAME = process.env.COOKIE_NAME || "token";

const signJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const setAuthCookie = (res, token) => {
  const isProd = String(process.env.COOKIE_SECURE).toLowerCase() === "true";
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  });
};

const sendAuth = (user, res, status = 200, message = "Success") => {
  const token = signJwt({ userId: user._id, role: user.VaiTro });
  setAuthCookie(res, token);
  res.status(status).json({
    success: true,
    message,
    data: {
      user: {
        id: user._id,
        name: user.TenDangNhap,
        email: user.Email,
        role: user.VaiTro,
        createdAt: user.NgayTao,
      },
      token,
    },
  });
};

// @route POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        success: false,
        error: { message: "Validation failed", details: errors.array() },
      });

    const { name, email, password } = req.body;
    const existed = await TaiKhoan.findOne({ Email: email });
    if (existed)
      return res
        .status(400)
        .json({ success: false, error: { message: "Email already exists" } });

    await TaiKhoan.create({
      TenDangNhap: name,
      Email: email,
      MatKhau: password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please sign in.",
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    next(err);
  }
};

// @route POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        success: false,
        error: { message: "Validation failed", details: errors.array() },
      });

    const { email, password } = req.body;
    const user = await TaiKhoan.findByEmail(email); // ✅ sửa model
    if (!user)
      return res
        .status(401)
        .json({ success: false, error: { message: "Invalid credentials" } });

    const ok = await user.comparePassword(password);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, error: { message: "Invalid credentials" } });

    return sendAuth(user, res, 200, "Login successful");
  } catch (err) {
    console.error("❌ Login error:", err);
    next(err);
  }
};

// @route GET /api/auth/me
export const getProfile = async (req, res, next) => {
  try {
    const user = await TaiKhoan.findById(req.user.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: { message: "User not found" } });
    res.status(200).json({ success: true, data: { user } });
  } catch (err) {
    console.error("❌ Get profile error:", err);
    next(err);
  }
};

// @route POST /api/auth/logout
export const logout = async (_req, res, next) => {
  try {
    const isProd = String(process.env.COOKIE_SECURE).toLowerCase() === "true";
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Logout error:", err);
    next(err);
  }
};
