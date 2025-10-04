// ==================================================
// MAIN SERVER FILE - ENTRY POINT (ES Modules)
// ==================================================
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
