// ==================================================
// MAIN SERVER FILE - ENTRY POINT (CommonJS)
// ==================================================
//! Bước 1: Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load biến môi trường từ file .env
dotenv.config();

//! Bước 2: Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

//! Bước 3: Kết nối tới MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/remn_project", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Kết nối tới MongoDB thành công");
  } catch (error) {
    console.error("❌ Lỗi kết nối tới MongoDB:", error);
    process.exit(1);
  }
};

//! Bước 4: Định nghĩa Schema và Model (Basic User - tương thích ngược)
const basicUser = mongoose.model("BasicUser", {
  name: String,
  email: String,
  password: String,
});

//! Bước 5: Cấu hình Middleware cần thiết
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

//! Bước 6: Routes cơ bản
app.get("/", (req, res) => {
  res.json({
    message: "Chào mừng đến với REMN Stack API!",
    version: "1.0.0",
    endpoints: { 
      health: "/api/health",
      users: "/users",
      taikhoan: "/api/taikhoan",
      thietbi: "/api/thietbi"
    },
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server đang hoạt động bình thường",
    timestamp: new Date().toISOString()
  });
});

//! Bước 7: API Routes hiện có
// API GET - Lấy toàn bộ users (basic)
app.get("/users", async (req, res) => {
  try {
    const users = await basicUser.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).json({ 
      success: false,
      error: "Lỗi server khi lấy danh sách người dùng" 
    });
  }
});

// API POST - Tạo mới user (basic) - CẢI THIỆN CHO ĐĂNG KÝ
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation cơ bản cho đăng ký
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Thiếu thông tin bắt buộc: name, email, password"
      });
    }

    // Kiểm tra email đã tồn tại (quan trọng cho đăng ký)
    const existingUser = await basicUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email đã được sử dụng"
      });
    }

    const newUser = new basicUser({ name, email, password });
    await newUser.save();
    
    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      data: { 
        id: newUser._id,
        name: newUser.name,
        email: newUser.email 
        // Không trả về password
      }
    });
  } catch (error) {
    console.error("❌ Lỗi khi đăng ký:", error);
    res.status(500).json({ 
      success: false,
      error: "Lỗi server khi đăng ký" 
    });
  }
});

//! Bước 8: Import routes chính (nếu có)
app.use("/api/taikhoan", require("./routes/taiKhoan"));
app.use("/api/thietbi", require("./routes/thietBi"));

//! Bước 9: Middleware xử lý lỗi 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy endpoint ${req.method} ${req.originalUrl}`
  });
});

//! Bước 10: Khởi động server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy trên http://localhost:${PORT}`);
      console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("❌ Không thể khởi động server:", error);
    process.exit(1);
  }
};

// Khởi động server
startServer();
