import React, { useState } from "react";
import {
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

const RequestPage = () => {
  const requests = [
    {
      id: "REQ-101",
      user: "Lê Văn A",
      email: "levana@example.com",
      subject: "Thiết bị không hoạt động",
      date: "2025-10-04 08:42",
      status: "pending",
    },
    {
      id: "REQ-102",
      user: "Trần Ngọc B",
      email: "ngocb@example.com",
      subject: "Cần hỗ trợ đăng nhập",
      date: "2025-10-03 14:22",
      status: "processing",
    },
    {
      id: "REQ-103",
      user: "Võ Quốc C",
      email: "quocc@example.com",
      subject: "Thiết bị báo lỗi cảm biến",
      date: "2025-10-02 19:17",
      status: "done",
    },
    {
      id: "REQ-104",
      user: "Nguyễn Minh D",
      email: "minhd@example.com",
      subject: "Yêu cầu xóa tài khoản",
      date: "2025-10-01 11:05",
      status: "closed",
    },
  ];

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = requests.filter(
    (r) =>
      (filter === "all" || r.status === filter) &&
      (r.user.toLowerCase().includes(search.toLowerCase()) ||
        r.subject.toLowerCase().includes(search.toLowerCase()))
  );

  const statusMap = {
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
    processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-800" },
    done: { label: "Đã hoàn tất", color: "bg-green-100 text-green-800" },
    closed: { label: "Đã đóng", color: "bg-gray-200 text-gray-700" },
  };

  return (
    <div className="space-y-8 p-4 md:p-6 bg-white-50 dark:bg-zinc-950 min-h-screen rounded-[25px]">
      {/* Thanh tìm kiếm + Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search box */}
        <div className="flex items-center w-full md:w-1/2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-[14px] shadow border border-gray-100 dark:border-zinc-800">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc tiêu đề..."
            className="w-full px-2 py-1 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "processing", "done", "closed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-[14px] text-sm font-medium border transition ${
                filter === s
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
            >
              {s === "all"
                ? "Tất cả"
                : s === "pending"
                ? "Chờ xử lý"
                : s === "processing"
                ? "Đang xử lý"
                : s === "done"
                ? "Hoàn tất"
                : "Đã đóng"}
            </button>
          ))}
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-4 shadow flex flex-col items-center justify-center">
          <MessageSquare className="text-emerald-500 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Tổng yêu cầu</p>
          <p className="text-2xl font-semibold">24</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-4 shadow flex flex-col items-center justify-center">
          <Clock className="text-yellow-500 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Đang chờ</p>
          <p className="text-2xl font-semibold">6</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-4 shadow flex flex-col items-center justify-center">
          <CheckCircle className="text-green-500 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Hoàn tất</p>
          <p className="text-2xl font-semibold">12</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-4 shadow flex flex-col items-center justify-center">
          <XCircle className="text-gray-400 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Đã đóng</p>
          <p className="text-2xl font-semibold">6</p>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white dark:bg-zinc-900 rounded-[25px] shadow p-5 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 dark:text-zinc-300 text-sm border-b dark:border-zinc-700">
              <th className="py-3 px-4">Mã yêu cầu</th>
              <th className="py-3 px-4">Người gửi</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Tiêu đề</th>
              <th className="py-3 px-4">Thời gian</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((req) => (
                <tr
                  key={req.id}
                  className="border-b dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-200">
                    {req.id}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {req.user}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{req.email}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">
                    {req.subject}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{req.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusMap[req.status].color}`}
                    >
                      {statusMap[req.status].label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-emerald-500 hover:text-emerald-600 transition">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-gray-500 dark:text-zinc-400"
                >
                  Không có yêu cầu nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestPage;
