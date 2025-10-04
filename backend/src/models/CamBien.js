const mongoose = require('mongoose');
const {Schema} = mongoose;

const CamBienSchema = new Schema(
    {
        id: String, // Sử dụng mã CB001, CB002... thay vì ObjectId
    ID_ThietBi: {
      type: String,
      ref: "ThietBi",
      required: [true, "ID thiết bị không được để trống"]
    },
    LoaiCamBien: {
      type: String,
      required: [true, "Loại cảm biến không được để trống"]
    },
    ThongSoKyThuat: {
      type: String,
      default: ""
    },
    TrangThai: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
    },
    NgayUpdate: {
      type: Date,
      default: Date.now
    },
    ID_LoaiCamBien: {
      type: String,
      default: ""
    }
    },
    { 
    collection: "CamBien",
    timestamps: true // Tự động thêm createdAt và updatedAt 
    }
);
CamBienSchema.index({ ID_ThietBi: 1 });
CamBienSchema.index({ TrangThai: 1 });
const CamBien = mongoose.model("CamBien", CamBienSchema); // Tạo model từ schema
module.exports = CamBien;