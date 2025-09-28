import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api' ,// lấy từ .env
  timeout: 10000,
});

export const taiKhoanAPI = {
  async getAll() {
    const res = await api.get("/taikhoan"); 
    // 👉 vì baseURL đã là http://localhost:5000/api
    // nên chỗ này chỉ cần "/taikhoan"
    return res.data.map(u => ({
      id: u._id,
      name: u.TenDangNhap,
      email: u.Email,
      role: Array.isArray(u.VaiTro) ? u.VaiTro[0] : u.VaiTro,
      status: (u.TrangThai || "").toLowerCase(),
    }));
  },
  //* Thêm tài khoản mới
  async create(data) {
    try{
      const res = await api.post("/taikhoan", data);
      const newUser = res.data.user || res.data;
      return {
        id: newUser._id,
        name: newUser.TenDangNhap,
        email: newUser.Email,
        role: Array.isArray(newUser.VaiTro) ? newUser.VaiTro[0] : newUser.VaiTro,
        status: (newUser.TrangThai || "").toLowerCase(),
      };
    } catch (error) {
      const apiError = new Error(error.response?.data?.message || "Không thể tạo tài khoản");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },
  //* Xóa User
  async remove(id) {
    try{
      const res = await api.delete(`/taikhoan/${id}`);
      return res.data;
    }catch (error) {
      const apiError = new Error(error.response?.data?.message || "Không thể xóa tài khoản");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },
  async updateStatus(id, newStatus) {
    try {
      const res = await api.patch(`/taikhoan/${id}/status`, { TrangThai: newStatus });
      return res.data.user; // Trả về document đã update
    } catch (error) {
      const apiError = new Error(error.response?.data?.message || "Không thể cập nhật trạng thái");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },
  async update(id, payload) {
    try {
      const res = await api.patch(`/taikhoan/${id}`, payload);
      return res.data.user; // Trả về document đã update
    } catch (error) {
      const apiError = new Error(error.response?.data?.message || "Không thể cập nhật thông tin");
      apiError.status = error.response?.status;
      throw apiError;
    }
  }
};
