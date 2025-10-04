// ==================================================
// MAIN SERVER FILE - ENTRY POINT (ES Modules)
// ==================================================
<<<<<<< HEAD
//! Bước 1: Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Đây là thư viện để xử lý các yêu cầu từ các nguồn khác nhau
const dotenv = require("dotenv"); // Thư viện để quản lý biến môi trường
require("dotenv").config(); // Load biến môi trường từ file .env
// const userRoutes = require("./routes/users");
//! Bước 2: Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.BACKEND_PORT || 5000; // Cổng mà server sẽ lắng nghe
 
//! Bước 3: Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Sử dụng trình phân tích cú pháp mới
  useUnifiedTopology: true, // Sử dụng trình quản lý kết nối mới
})
.then(()=>{
  console.log("Kết nối tới MongoDB thành công");
})
.catch((err)=>{
  console.error("Lỗi kết nối tới MongoDB:", err);
});

//! Bước 4: Đinh nghĩa Schema và Model
const user = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

//! Bước 5: Cấu hình Middleware
app.use(express.json()); // Cho phép đoc dữ liệu dạng JSON
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // Cho phép cookies
}))

//! Bước 6:  API GET - Lấy toàn bộ users
app.get("/users", async (req, res)=>{
  try{
    const users = await user.find(); // Lấy toàn bộ users từ database
    res.status(200).json(users); // Trả về danh sách users
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
})

//! Bước 7: API POST - Tạo mới user
app.post("/users", async (req, res)=>{
  try{
    const { name, email, password } = req.body; // Lấy dữ liệu từ body request
    const newUser = new user({ name, email, password }); // Tạo mới user
    await newUser.save(); // Lưu user vào database
    res.status(201).json(newUser); // Trả về user vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo người dùng mới:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
})

//! Bước 8: Khởi động server
app.listen(PORT, ()=>{
  console.log(`Server đang chạy trên cổng http://localhost:${PORT}`);
})
//* API Routes
// app.use("/api/users", userRoutes); // User management routes: /api/users
app.use("/api/taikhoan", require("./routes/taiKhoan"));
app.use("/api/thietbi", require("./routes/thietBi"));
=======
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";

// Load env
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Nếu set COOKIE_SECURE=true và chạy sau proxy/ingress, cần trust proxy
if (String(process.env.COOKIE_SECURE).toLowerCase() === "true") {
  app.set("trust proxy", 1);
}

// ==================================================
// DATABASE CONNECTION
// ==================================================
await connectDB();

// ==================================================
// MIDDLEWARES
// ==================================================
app.use(helmet());

// Parse JSON / form
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Cookie (để đọc/ghi JWT HttpOnly)
app.use(cookieParser());

// CORS cho FE (nhiều origin cách nhau bằng dấu phẩy)
const allowOrigins = (process.env.FRONTEND_URL &&
  process.env.FRONTEND_URL.split(",").map((s) => s.trim())) || [
  "http://localhost:3000",
];
app.use(
  cors({
    origin: allowOrigins,
    credentials: true,
  })
);

// Health
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

// ==================================================
// ROUTES
// ==================================================
// Chỉ limit các endpoint "nhạy cảm" như login/register, KHÔNG áp cho /me
const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const maxReq = Number(process.env.RATE_LIMIT_MAX || 60);
const authLimiter = rateLimit({ windowMs, max: maxReq });

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth", authRoutes);

// Root
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to REMN Stack API!",
    version: "1.0.0",
    endpoints: { health: "/api/health", auth: "/api/auth" },
  });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: { message: err.message || "Server error" },
  });
});

// ==================================================
// START SERVER
// ==================================================
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
});
>>>>>>> origin/Tun
