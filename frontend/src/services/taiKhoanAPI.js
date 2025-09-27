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
  }
};
