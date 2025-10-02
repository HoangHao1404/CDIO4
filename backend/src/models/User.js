// ==================================================
// USER MODEL - MONGODB SCHEMA
// ==================================================
// Định nghĩa cấu trúc dữ liệu cho User trong database
// Sử dụng Mongoose Schema để validate và structure data

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Thông tin cơ bản
    name: {
      type: String,
      required: [true, "Vui lòng cung cấp tên người dùng"],
      trim: true,
      maxlength: [50, "Tên không thể dài hơn 50 ký tự"],
    },

    email: {
      type: String,
      required: [true, "Vui lòng cung cấp email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng cung cấp email hợp lệ",
      ],
    },

    password: {
      type: String,
      required: [true, "Vui lòng cung cấp mật khẩu"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
      select: false, // Không trả password khi query user
    },

    // Thông tin bổ sung
    avatar: {
      type: String,
      default: "", // URL của ảnh avatar
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    // Tự động tạo createdAt và updatedAt
    timestamps: true,

    // Loại bỏ __v field khi convert to JSON
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.password; // Đảm bảo không bao giờ trả password
        return ret;
      },
    },
  }
);

// ==================================================
// MIDDLEWARE - CHẠY TRƯỚC KHI SAVE
// ==================================================

// Hash password trước khi save vào database
userSchema.pre("save", async function (next) {
  // Chỉ hash nếu password bị modify
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hash password với salt rounds = 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ==================================================
// INSTANCE METHODS
// ==================================================

// Method để so sánh password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method để cập nhật last login
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  return await this.save();
};

// ==================================================
// STATIC METHODS
// ==================================================

// Tìm user active
userSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Tìm user by email (kể cả password)
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).select("+password");
};

// ==================================================
// INDEXES - TỐI ƯU PERFORMANCE
// ==================================================
userSchema.index({ email: 1 }); // Index cho email lookup
userSchema.index({ createdAt: -1 }); // Index cho sort by creation date
userSchema.index({ isActive: 1 }); // Index cho filter active users

// Export model sử dụng CommonJS
const User = mongoose.model("User", userSchema);
module.exports = User;
