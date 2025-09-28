const router = require("express").Router();
const TaiKhoan = require("../models/TaiKhoan");
const bcrypt = require("bcryptjs");

// GET /api/taikhoan → trả về danh sách
router.get("/", async (req, res) => {
  try {
    const users = await TaiKhoan.find(
      {},
      "_id TenDangNhap Email VaiTro TrangThai"
    ).lean();
    res.json(users);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Lỗi lấy danh sách tài khoản", error: e.message });
  }
});

// POST /api/taikhoan - Tạo tài khoản mới
router.post("/", async (req, res) => {
  try {
    const { TenDangNhap, HoTen, Email, VaiTro, TrangThai, MatKhau } = req.body;

    // Validate các trường bắt buộc
    if (!TenDangNhap || !Email) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ message: "Email không đúng định dạng" });
    }
    const existedUsername = await TaiKhoan.findOne({ TenDangNhap });
    if (existedUsername) {
      return res.status(409).json({ message: "Tên đăng nhập đã tồn tại" });
    }
    const existedEmail = await TaiKhoan.findOne({ Email });
    if (existedEmail) {
      return res.status(409).json({ message: "Email đã tồn tại" });
    }

    // Sinh mã _id kiểu TKxx
    const lastUser = await TaiKhoan.findOne({
      _id: { $regex: /^TK\d+$/ },
    }).sort({ _id: -1 });
    let newId = "TK01";
    if (lastUser && lastUser._id) {
      const lastNum = parseInt(lastUser._id.replace("TK", "")) || 1;
      newId = "TK" + String(lastNum + 1).padStart(2, "0");
    }

    // Hash mật khẩu
    let hashedPassword = null;
    if (MatKhau && MatKhau.length >= 6) {
      hashedPassword = await bcrypt.hash(MatKhau, 12);
    } else {
      hashedPassword = await bcrypt.hash("123456", 12); // Mật khẩu mặc định
    }

    // Tạo user mới với mã _id riêng
    const newUser = new TaiKhoan({
      _id: newId,
      TenDangNhap,
      HoTen,
      Email,
      VaiTro: VaiTro ? [VaiTro] : ["User"],
      TrangThai: TrangThai || "active",
      MatKhau: hashedPassword,
      NgayTao: new Date(),
    });
    await newUser.save();

    // Trả về user mới (ẩn mật khẩu)
    res.status(201).json({
      user: {
        _id: newUser._id,
        TenDangNhap: newUser.TenDangNhap,
        HoTen: newUser.HoTen,
        Email: newUser.Email,
        VaiTro: newUser.VaiTro,
        TrangThai: newUser.TrangThai,
        NgayTao: newUser.NgayTao,
      },
    });
  } catch (err) {
    console.error("❌ Lỗi khi tạo tài khoản:", err); // Thêm dòng này để log lỗi chi tiết
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// DELETE /api/taikhoan/:id - Xóa tài khoản
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await TaiKhoan.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ ok: false, message: "Tài khoản không tồn tại" });
    }

    // Ràng buộc: Không cho xóa admin cuối cùng (nếu cần)
    if (user.VaiTro.includes("Admin")) {
      const adminCount = await TaiKhoan.countDocuments({ VaiTro: "Admin" });
      if (adminCount <= 1) {
        return res
          .status(403)
          .json({ ok: false, message: "Không thể xóa admin cuối cùng" });
      }
    }

    await TaiKhoan.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Lỗi khi xóa tài khoản:", err);
    res
      .status(500)
      .json({ ok: false, message: "Lỗi server", error: err.message });
  }
});

// PATCH /api/taikhoan/:id/status - Cập nhật trạng thái tài khoản
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { TrangThai } = req.body;

    // Chỉ cho phép các trạng thái hợp lệ
    const allowed = ["active", "locked", "inactive", "banned"];
    if (!allowed.includes(TrangThai)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    // Không cho tự khóa chính mình (nếu cần, kiểm tra req.user._id)
    // Không cho khóa admin cuối cùng
    const user = await TaiKhoan.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    if (user.VaiTro.includes("Admin") && TrangThai === "locked") {
      const adminCount = await TaiKhoan.countDocuments({
        VaiTro: "Admin",
        TrangThai: "active",
      });
      if (adminCount <= 1) {
        return res.status(403).json({ message: "Không thể khóa admin cuối cùng" });
      }
    }

    // Cập nhật trạng thái
    const updated = await TaiKhoan.findByIdAndUpdate(id, { TrangThai }, { new: true });
    res.json({ user: updated });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật trạng thái:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// PATCH /api/taikhoan/:id - Cập nhật thông tin tài khoản
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { HoTen, Email, VaiTro, TrangThai } = req.body;

    // Chỉ cho phép các trường hợp lệ
    const updateFields = {};
    if (HoTen) updateFields.HoTen = HoTen;
    if (Email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) {
        return res.status(400).json({ message: "Email không đúng định dạng" });
      }
      // Kiểm tra email trùng
      const existed = await TaiKhoan.findOne({ Email, _id: { $ne: id } });
      if (existed) {
        return res.status(409).json({ message: "Email đã tồn tại" });
      }
      updateFields.Email = Email;
    }
    if (VaiTro) {
      const allowedRoles = ["User", "Admin", "Technician"];
      if (!allowedRoles.includes(VaiTro)) {
        return res.status(400).json({ message: "Vai trò không hợp lệ" });
      }
      updateFields.VaiTro = [VaiTro];
    }
    if (TrangThai) {
      const allowedStatus = ["active", "locked", "inactive", "banned"];
      if (!allowedStatus.includes(TrangThai)) {
        return res.status(400).json({ message: "Trạng thái không hợp lệ" });
      }
      updateFields.TrangThai = TrangThai;
    }

    // Rule: không cho tự hạ vai trò hoặc khóa chính mình (nếu cần, kiểm tra req.user._id)
    // ...

    // Cập nhật DB
    const updated = await TaiKhoan.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    res.json({
      user: {
        _id: updated._id,
        TenDangNhap: updated.TenDangNhap,
        HoTen: updated.HoTen,
        Email: updated.Email,
        VaiTro: updated.VaiTro,
        TrangThai: updated.TrangThai,
        NgayTao: updated.NgayTao
      }
    });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật tài khoản:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

module.exports = router;
