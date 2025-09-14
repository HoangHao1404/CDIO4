// ==================================================
// MAIN SERVER FILE - ENTRY POINT
// ==================================================
// File này là điểm khởi đầu của backend server
// Chứa cấu hình Express, middleware và khởi chạy server

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import các module tự tạo
import connectDB from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";

// Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

// Load environment variables
dotenv.config();

// Khởi tạo Express app
const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// ==================================================
// DATABASE CONNECTION
// ==================================================
// Kết nối tới MongoDB
connectDB();

// ==================================================
// MIDDLEWARE SETUP
// ==================================================

// CORS configuration - Cho phép frontend truy cập API
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Cho phép cookies
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" })); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// ==================================================
// ROUTES SETUP
// ==================================================

// Health check endpoint - Kiểm tra server có hoạt động không
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.use("/api/auth", authRoutes); // Authentication routes: /api/auth/login, /api/auth/register
app.use("/api/users", userRoutes); // User management routes: /api/users

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to REMN Stack API!",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      users: "/api/users",
    },
  });
});

// 404 handler - Route không tồn tại
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// ==================================================
// ERROR HANDLING MIDDLEWARE
// ==================================================
app.use(errorHandler);

// ==================================================
// START SERVER
// ==================================================
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("❌ Unhandled Promise Rejection:", err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

export default app;
