const { Schema, model } = require("mongoose");

const TaiKhoanSchema = new Schema({
  _id: { type: String },                // ví dụ "TK001"
  TenDangNhap: { type: String, required: true },
  MatKhau: { type: String },
  TrangThai: { type: String, default: "active" }, // active | locked | banned ...
  NgayTao: { type: Date, default: Date.now },
  VaiTro: { type: [String], default: ["User"] },  // có thể là mảng
  ID_KhachHang: { type: String },
  Email: { type: String }
}, { collection: "TaiKhoan" });
module.exports = model("TaiKhoan", TaiKhoanSchema);
