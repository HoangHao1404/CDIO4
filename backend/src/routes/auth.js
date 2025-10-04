// ==================================================
// AUTHENTICATION ROUTES  (/api/auth/*)
// ==================================================
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TaiKhoan = require("../models/TaiKhoan");

const router = express.Router();

// Tạo JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// @route POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("✅ Nhận được request đăng ký:", { name, email });

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Vui lòng cung cấp đầy đủ thông tin: tên, email và mật khẩu"
      });
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Mật khẩu phải có ít nhất 6 ký tự"
      });
    }

    // Kiểm tra email đã tồn tại
    const existingUser = await TaiKhoan.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email đã được sử dụng"
      });
    }

    // Tạo tài khoản mới - TaiKhoan model sẽ tự động tạo ID và hash password
    const newUser = await TaiKhoan.create({
      TenDangNhap: name,
      HoTen: name,
      Email: email,
      MatKhau: password, // Sẽ được hash tự động bởi pre-save middleware
      VaiTro: ["User"],
      TrangThai: "active"
    });

    console.log("✅ Đăng ký thành công cho email:", email, "với ID:", newUser._id);

    res.status(201).json({
      success: true,
      message: "Đăng ký tài khoản thành công. Vui lòng đăng nhập.",
      data: {
        user: {
          id: newUser._id,
          name: newUser.HoTen,
          email: newUser.Email,
        }
      }
    });

  } catch (error) {
    console.error("❌ Lỗi đăng ký:", error);
    res.status(500).json({
      success: false,
      error: "Lỗi server khi đăng ký tài khoản"
    });
  }
});

// @route POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("✅ Nhận được request đăng nhập:", { email });

    // Kiểm tra email và password có được cung cấp
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Vui lòng cung cấp email và mật khẩu"
      });
    }

    // Tìm user và lấy cả password (được ẩn bằng select: false)
    const user = await TaiKhoan.findOne({ Email: email }).select('+MatKhau');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Email hoặc mật khẩu không đúng"
      });
    }

    // Kiểm tra trạng thái tài khoản
    if (user.TrangThai !== 'active') {
      return res.status(401).json({
        success: false,
        error: "Tài khoản đã bị khóa hoặc vô hiệu hóa"
      });
    }

    // Kiểm tra password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        error: "Email hoặc mật khẩu không đúng"
      });
    }

    // Tạo JWT token
    const token = signToken(user._id);

    console.log("✅ Đăng nhập thành công cho email:", email);

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      data: {
        user: {
          id: user._id,
          name: user.HoTen || user.TenDangNhap,
          email: user.Email,
          role: user.VaiTro,
        }
      }
    });

  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    res.status(500).json({
      success: false,
      error: "Lỗi server khi đăng nhập"
    });
  }
});

// @route POST /api/auth/logout
router.post("/logout", (req, res) => {
  console.log("✅ Nhận được request đăng xuất");
  
  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công"
  });
});

module.exports = router;
