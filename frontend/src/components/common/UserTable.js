import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Lock } from "lucide-react";
import { taiKhoanAPI } from "../../services/taiKhoanAPI";

export default function UserTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* Modal (giữ nguyên như cũ) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {/* ... form thêm user ... */}
          </div>
        </div>
      )}
    </div>
  );
}
