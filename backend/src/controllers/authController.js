import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import TaiKhoan from "../models/TaiKhoan.js";

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
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const sendAuth = (user, res, status = 200, message = "Thành công") => {
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
        error: { message: "Xác thực thất bại", details: errors.array() },
      });

    const { name, email, password } = req.body;

    // 1. Kiểm tra email đã tồn tại
    const existed = await TaiKhoan.findOne({ Email: email });
    if (existed)
      return res
        .status(400)
        .json({ success: false, error: { message: "Email đã tồn tại" } });

    // 2. Tìm _id lớn nhất hiện tại theo format TK<number>
    const latestAccount = await TaiKhoan.findOne({ _id: /^TK\d+$/ })
      .sort({ _id: -1 })
      .lean();

    let nextId = "TK1";
    if (latestAccount) {
      const currentNum = parseInt(latestAccount._id.replace("TK", ""));
      nextId = "TK" + (currentNum + 1);
    }

    // 3. Tìm ID_KhachHang lớn nhất theo format KH<number>
    const latestKH = await TaiKhoan.findOne({ ID_KhachHang: /^KH\d+$/ })
      .sort({ ID_KhachHang: -1 })
      .lean();

    let nextKH = "KH1";
    if (latestKH && latestKH.ID_KhachHang) {
      const currentKH = parseInt(latestKH.ID_KhachHang.replace("KH", ""));
      nextKH = "KH" + (currentKH + 1);
    }

    // 4. Tạo tài khoản mới với _id và ID_KhachHang custom
    await TaiKhoan.create({
      _id: nextId,
      TenDangNhap: name,
      Email: email,
      MatKhau: password,
      ID_KhachHang: nextKH,
    });

    return res.status(201).json({
      success: true,
      message: "Đăng ký tài khoản thành công. Vui lòng đăng nhập.",
    });
  } catch (err) {
    console.error("❌ Lỗi đăng ký:", err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        success: false,
        error: { message: "Xác thực thất bại", details: errors.array() },
      });

    const { email, password } = req.body;
    const user = await TaiKhoan.findByEmail(email);
    if (!user)
      return res
        .status(401)
        .json({
          success: false,
          error: { message: "Thông tin đăng nhập không hợp lệ" },
        });

    const ok = await user.comparePassword(password);
    if (!ok)
      return res
        .status(401)
        .json({
          success: false,
          error: { message: "Thông tin đăng nhập không hợp lệ" },
        });

    return sendAuth(user, res, 200, "Đăng nhập thành công");
  } catch (err) {
    console.error("❌ Lỗi đăng nhập:", err);
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await TaiKhoan.findById(req.user.id);
    if (!user)
      return res
        .status(404)
        .json({
          success: false,
          error: { message: "Không tìm thấy người dùng" },
        });
    res.status(200).json({ success: true, data: { user } });
  } catch (err) {
    console.error("❌ Lỗi lấy thông tin profile:", err);
    next(err);
  }
};

export const logout = async (_req, res, next) => {
  try {
    const isProd = String(process.env.COOKIE_SECURE).toLowerCase() === "true";
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });
    res.status(200).json({ success: true, message: "Đăng xuất thành công" });
  } catch (err) {
    console.error("❌ Lỗi đăng xuất:", err);
    next(err);
  }
};
