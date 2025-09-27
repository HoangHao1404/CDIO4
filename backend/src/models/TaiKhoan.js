// ========================
// 1. TaiKhoan MODEL (đổi từ User.js)
// ========================
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const taiKhoanSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    }, // optional custom ID
    TenDangNhap: {
      type: String,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    MatKhau: {
      type: String,
      required: true,
      select: false,
    },
    VaiTro: {
      type: [String], // ví dụ: ['khachhang'] hoặc ['admin']
      default: ["khachhang"],
    },
    TrangThai: {
      type: String,
      enum: ["active", "locked", "deleted"],
      default: "active",
    },
    ID_KhachHang: {
      type: String,
      default: null,
    },
    NgayTao: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.__v;
        delete ret.MatKhau;
        return ret;
      },
    },
  }
);

taiKhoanSchema.pre("save", async function (next) {
  if (!this.isModified("MatKhau")) return next();
  const salt = await bcrypt.genSalt(12);
  this.MatKhau = await bcrypt.hash(this.MatKhau, salt);
  next();
});

taiKhoanSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.MatKhau);
};

taiKhoanSchema.statics.findByEmail = function (email) {
  return this.findOne({ Email: email }).select("+MatKhau");
};

export default mongoose.model("TaiKhoan", taiKhoanSchema, "TaiKhoan");
