import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Hàm tạo ID tự động dạng TK1, TK2,...
async function generateNextTaiKhoanId() {
  const last = await mongoose
    .model("TaiKhoan")
    .findOne({})
    .sort({ _id: -1 })
    .collation({ locale: "en", numericOrdering: true });

  if (!last || !last._id?.startsWith("TK")) return "TK1";

  const num = parseInt(last._id.slice(2)) + 1;
  return `TK${num}`;
}

const taiKhoanSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
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
      type: [String],
      default: ["User"],
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

// Tự động gán ID dạng "TK1", "TK2",...
taiKhoanSchema.pre("save", async function (next) {
  if (!this._id) {
    this._id = await generateNextTaiKhoanId();
  }

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
