const express = require("express");
const router = express.Router();
const ThietBi = require("../models/ThietBi");
const CamBien = require("../models/CamBien");

// GET /api/thietbi - Lấy danh sách thiết bị kèm cảm biến
router.get("/", async (req, res) => {
  try {
    const { search = "", status = "all", page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Xây dựng pipeline aggregation
    let pipeline = [];

    // Bước 1: Tìm theo tên thiết bị nếu có search
    if (search) {
      pipeline.push({
        $match: {
          TenThietBi: { $regex: search, $options: "i" },
        },
      });
    }

    // Bước 2: Lookup để join với CamBien
    pipeline.push({
      $lookup: {
        from: "CamBien",
        localField: "_id",
        foreignField: "ID_ThietBi",
        as: "camBien",
      },
    });

    // Bước 3: Filter theo trạng thái nếu cần
    if (status && status !== "all") {
      pipeline.push({
        $match: {
          "camBien.TrangThai": status,
        },
      });
    }

    // Bước 4: Đếm tổng số bản ghi trước khi phân trang
    const countPipeline = [...pipeline]; // Copy pipeline hiện tại
    countPipeline.push({ $count: "totalCount" });

    const countResult = await ThietBi.aggregate(countPipeline);
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;

    // Bước 5: Thêm phân trang vào pipeline
    pipeline.push(
      { $sort: { NgayNhap: -1 } }, // Sắp xếp theo ngày nhập mới nhất
      { $skip: skip },
      { $limit: parseInt(limit) }
    );

    // Thực thi aggregation
    const devices = await ThietBi.aggregate(pipeline);

    // Trả về kết quả với pagination
    res.json({
      devices,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalCount / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách thiết bị:", err);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách thiết bị" });
  }
});

// Các route khác (thêm/sửa/xóa) sẽ bổ sung sau

module.exports = router;
