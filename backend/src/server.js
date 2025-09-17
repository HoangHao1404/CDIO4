{// // ==================================================
// // MAIN SERVER FILE - ENTRY POINT
// // ==================================================
// // File này là điểm khởi đầu của backend server
// // Chứa cấu hình Express, middleware và khởi chạy server

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// // Import các module tự tạo
// import connectDB from "./config/database.js";
// import errorHandler from "./middleware/errorHandler.js";

// // Import routes
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";

// // Load environment variables
// dotenv.config();

// // Khởi tạo Express app
// const app = express();
// const PORT = process.env.BACKEND_PORT || 5000;

// // ==================================================
// // DATABASE CONNECTION
// // ==================================================
// // Kết nối tới MongoDB
// connectDB();

// // ==================================================
// // MIDDLEWARE SETUP
// // ==================================================

// // CORS configuration - Cho phép frontend truy cập API
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true, // Cho phép cookies
//   })
// );

// // Body parsing middleware
// app.use(express.json({ limit: "10mb" })); // Parse JSON requests
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// // ==================================================
// // ROUTES SETUP
// // ==================================================

// // Health check endpoint - Kiểm tra server có hoạt động không
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     message: "Server is running!",
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || "development",
//   });
// });

// // API Routes
// app.use("/api/auth", authRoutes); // Authentication routes: /api/auth/login, /api/auth/register
// app.use("/api/users", userRoutes); // User management routes: /api/users

// // Root endpoint
// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to REMN Stack API!",
//     version: "1.0.0",
//     endpoints: {
//       health: "/api/health",
//       auth: "/api/auth",
//       users: "/api/users",
//     },
//   });
// });

// // 404 handler - Route không tồn tại
// app.use("*", (req, res) => {
//   res.status(404).json({
//     error: "Endpoint not found",
//     path: req.originalUrl,
//     method: req.method,
//   });
// });

// // ==================================================
// // ERROR HANDLING MIDDLEWARE
// // ==================================================
// app.use(errorHandler);

// // ==================================================
// // START SERVER
// // ==================================================
// app.listen(PORT, () => {
//   console.log(`🚀 Backend server running on port ${PORT}`);
//   console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
//   console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
//   console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.log("❌ Unhandled Promise Rejection:", err.message);
//   process.exit(1);
// });

// // Handle uncaught exceptions
// process.on("uncaughtException", (err) => {
//   console.log("❌ Uncaught Exception:", err.message);
//   process.exit(1);
// });

// export default app;
}
// ==================================================
//* Kết nối mongoDB
// ==================================================
//! Bước 1: Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Đây là thư viện để xử lý các yêu cầu từ các nguồn khác nhau
const dotenv = require("dotenv"); // Thư viện để quản lý biến môi trường
require("dotenv").config(); // Load biến môi trường từ file .env

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


// ==================================================

//! API tài khoản
const TaiKhoan = mongoose.model("TaiKhoan", {
  TenDangNhap: String,
  MatKhau: String,
  TrangThai: String,
  NgayTao: Date,
  VaiTro: [String],
  ID_KhachHang: String
}, "TaiKhoan"); // ép rõ collection là "TaiKhoan"

module.exports = TaiKhoan;
app.get("/taikhoan", async (req, res) => {
  try {
    const accounts = await TaiKhoan.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
