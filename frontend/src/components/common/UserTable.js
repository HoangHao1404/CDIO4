import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Lock, X } from "lucide-react";
import { taiKhoanAPI } from "../../services/taiKhoanAPI";

export default function UserTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State cho form thêm user
  const [formData, setFormData] = useState({
    TenDangNhap: "",
    HoTen: "",
    Email: "",
    VaiTro: "User",
    TrangThai: "active",
    MatKhau: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // gọi API khi component mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await taiKhoanAPI.getAll();
        setRows(data);
      } catch (e) {
        setError(e.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // lọc dữ liệu
  const filteredUsers = rows.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const statusColor = {
    active: "bg-green-400",
    banned: "bg-red-400",
    locked: "bg-yellow-400",
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  // Reset form khi đóng modal
  const resetForm = () => {
    setFormData({
      TenDangNhap: "",
      HoTen: "",
      Email: "",
      VaiTro: "User", 
      TrangThai: "active",
      MatKhau: ""
    });
    setFormError("");
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form client-side
  const validateForm = () => {
    const { TenDangNhap, HoTen, Email, MatKhau } = formData;
    
    if (!TenDangNhap.trim()) return "Tên đăng nhập không được để trống";
    if (!HoTen.trim()) return "Họ tên không được để trống";
    if (!Email.trim()) return "Email không được để trống";
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) return "Email không đúng định dạng";
    
    // Validate password (nếu có nhập)
    if (MatKhau && MatKhau.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
    
    return null;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate client-side
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setFormLoading(true);
      setFormError("");
      
      console.log("🚀 Đang gửi request tạo user:", formData);
      
      // Gọi API tạo user mới
      const newUser = await taiKhoanAPI.create(formData);
      
      // Cập nhật bảng - thêm user mới vào đầu danh sách
      setRows(prev => [newUser, ...prev]);
      
      // Đóng modal và reset form
      setIsModalOpen(false);
      resetForm();
      
      // Toast thành công (có thể thêm toast library sau)
      console.log("✅ Thêm user thành công:", newUser);
      
    } catch (error) {
      console.error("❌ Lỗi khi thêm user:", error);
      
      // Hiển thị lỗi cụ thể từ backend
      if (error.status === 409) {
        setFormError("Tên đăng nhập hoặc email đã tồn tại");
      } else if (error.status === 400) {
        setFormError(error.message || "Dữ liệu không hợp lệ");
      } else if (error.status === 403) {
        setFormError("Bạn không có quyền thực hiện hành động này");
      } else {
        setFormError("Có lỗi xảy ra khi thêm user. Vui lòng thử lại.");
      }
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="p-4">⏳ Đang tải dữ liệu...</div>;
  if (error) return <div className="p-4 text-red-500">❌ {error}</div>;

  return (
    <div className="space-y-6">
      {/* Header filter row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên hoặc email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:max-w-sm bg-gray-100"
        />

        <div className="flex gap-3 flex-wrap">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border px-3 py-2 rounded-md bg-gray-100"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Technician">Technician</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-md bg-gray-100"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
            <option value="locked">Locked</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            + Thêm User
          </button>
        </div>
      </div>

      {/* Table section */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 italic">{user.id}</td>
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      statusColor[user.status]
                    }`}
                  ></span>
                  {user.status}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    title="Sửa"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    title="Khoá"
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                  <button
                    title="Xoá"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {!filteredUsers.length && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Không có dữ liệu phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal thêm user */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header modal */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Thêm tài khoản mới
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form thêm user */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tên đăng nhập */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="TenDangNhap"
                  value={formData.TenDangNhap}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>

              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="HoTen"
                  value={formData.HoTen}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập email"
                  required
                />
              </div>

              {/* Vai trò */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <select
                  name="VaiTro"
                  value={formData.VaiTro}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>

              {/* Trạng thái */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  name="TrangThai"
                  value={formData.TrangThai}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                  <option value="banned">Banned</option>
                </select>
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu 
                  <span className="text-gray-500 text-xs ml-2">
                    (Để trống để hệ thống tự tạo)
                  </span>
                </label>
                <input
                  type="password"
                  name="MatKhau"
                  value={formData.MatKhau}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập mật khẩu (tùy chọn)"
                />
              </div>

              {/* Hiển thị lỗi */}
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {formError}
                </div>
              )}

              {/* Nút submit */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={formLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang lưu...
                    </>
                  ) : (
                    "Thêm tài khoản"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
