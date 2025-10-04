const { Schema, model } = require("mongoose");

const TaiKhoanSchema = new Schema(
  {
    _id: String, // Cho phép _id là String
    TenDangNhap: String,
    HoTen: String,
    Email: String,
    VaiTro: [String],
    TrangThai: String,
    MatKhau: String,
    NgayTao: Date,
  },
  { collection: "TaiKhoan" }
);
module.exports = model("TaiKhoan", TaiKhoanSchema);
