import axios from "axios";

// Tạo instance của axios với cấu hình cơ bản
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api", // Lấy từ .env
  timeout: 10000, // Thời gian chờ 10 giây
});

export const deviceAPI = {
  // Lấy danh sách thiết bị với cảm biến kèm phân trang và lọc
  async getAll({ search = "", status = "all", page = 1, limit = 10 } = {}) {
    try {
      const params = { search, status, page, limit };
      const res = await api.get("/thietbi", { params });
      return res.data;
    } catch (error) {
      const apiError = new Error(
        error.response?.data?.message || "Không thể tải dữ liệu thiết bị"
      );
      apiError.status = error.response?.status;
      throw apiError;
    }
  },

  // Các phương thức khác sẽ bổ sung khi triển khai thêm/sửa/xóa
  async getById(id) {
    try {
      const res = await api.get(`/thietbi/${id}`);
      return res.data.device;
    } catch (error) {
      const apiError = new Error(
        error.response?.data?.message || "Không thể tải thông tin thiết bị"
      );
      apiError.status = error.response?.status;
      throw apiError;
    }
  },
};
