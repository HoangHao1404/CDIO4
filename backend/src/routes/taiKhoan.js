const router = require("express").Router();
const TaiKhoan = require("../models/TaiKhoan");

// GET /api/taikhoan → trả về danh sách
router.get("/", async (req, res) => {
  try {
    const users = await TaiKhoan.find(
      {},
      "_id TenDangNhap Email VaiTro TrangThai"
    ).lean();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Lỗi lấy danh sách tài khoản", error: e.message });
  }
});

module.exports = router;
