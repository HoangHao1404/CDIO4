const mongoose = require('mongoose');
const {Schema} = mongoose;

const ThietBiSchema = new Schema(
    {
        _id: String,
        TenThietBi: {
            type: String,
            required: [true, "Tên thiết bị khôn được để trống"],
            trim: true,
        },
        ID_NhaSanXuat: {
            type: String,
            default: ""
        },
        NgayNhap: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "ThietBi",
        timestamps: true // Tự động thêm createdAt và updatedAt
    }
);
const ThietBi = mongoose.model("ThietBi", ThietBiSchema); // Tạo model từ schema
module.exports = ThietBi;