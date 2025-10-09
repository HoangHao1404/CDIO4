import React, { useState } from "react";
import {
  Bell,
  Plus,
  Search,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
} from "lucide-react";

const NotificationPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Dữ liệu mẫu
  const notifications = [
    {
      id: "NTF-001",
      title: "Bảo trì hệ thống",
      message: "Hệ thống sẽ bảo trì vào 22:00 tối nay trong 30 phút.",
      audience: "Tất cả người dùng",
      status: "sent",
      date: "2025-10-04 09:15",
    },
    {
      id: "NTF-002",
      title: "Cập nhật tính năng mới",
      message: "Phiên bản 2.5 đã ra mắt, bổ sung tính năng cảnh báo tự động.",
      audience: "Người dùng Premium",
      status: "scheduled",
      date: "2025-10-06 08:00",
    },
    {
      id: "NTF-003",
      title: "Thiết bị ngoại tuyến",
      message: "Thiết bị D-023 đã mất kết nối quá 2 giờ.",
      audience: "Admin",
      status: "sent",
      date: "2025-10-05 15:30",
    },
    {
      id: "NTF-004",
      title: "Lỗi cảm biến PM2.5",
      message: "Một số cảm biến báo lỗi đo nồng độ PM2.5.",
      audience: "Tất cả người dùng",
      status: "draft",
      date: "2025-10-03 10:10",
    },
  ];

  const statusMap = {
    sent: { label: "Đã gửi", color: "bg-green-100 text-green-800" },
    scheduled: { label: "Đã hẹn giờ", color: "bg-blue-100 text-blue-800" },
    draft: { label: "Bản nháp", color: "bg-gray-200 text-gray-700" },
  };

  // Lọc kết quả
  const filtered = notifications.filter(
    (n) =>
      (filter === "all" || n.status === filter) &&
      (n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 p-4 md:p-6 bg-white-50 dark:bg-zinc-950 min-h-screen">

      {/* Bộ lọc + Nút tạo thông báo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          {/* Ô tìm kiếm */}
          <div className="flex items-center w-full md:w-80 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg shadow border border-gray-100 dark:border-zinc-800">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề hoặc nội dung..."
              className="w-full px-2 py-1 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2 flex-wrap">
            {["all", "sent", "scheduled", "draft"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
                  filter === s
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                {s === "all"
                  ? "Tất cả"
                  : s === "sent"
                  ? "Đã gửi"
                  : s === "scheduled"
                  ? "Hẹn giờ"
                  : "Bản nháp"}
              </button>
            ))}
          </div>
        </div>

        {/* Nút tạo thông báo */}
        <button
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold 
             px-6 py-2.5 rounded-[14px] shadow transition 
             flex items-center justify-center whitespace-nowrap"
        >
          + Tạo thông báo
        </button>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow flex flex-col items-center justify-center">
          <Bell className="text-emerald-500 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Tổng thông báo</p>
          <p className="text-2xl font-semibold">32</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow flex flex-col items-center justify-center">
          <Send className="text-green-500 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Đã gửi</p>
          <p className="text-2xl font-semibold">18</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow flex flex-col items-center justify-center">
          <Clock className="text-blue-500 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Hẹn giờ</p>
          <p className="text-2xl font-semibold">8</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow flex flex-col items-center justify-center">
          <XCircle className="text-gray-400 mb-2" size={22} />
          <p className="text-gray-500 text-sm">Bản nháp</p>
          <p className="text-2xl font-semibold">6</p>
        </div>
      </div>

      {/* Danh sách */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-5 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 dark:text-zinc-300 text-sm border-b dark:border-zinc-700">
              <th className="py-3 px-4">Mã</th>
              <th className="py-3 px-4">Tiêu đề</th>
              <th className="py-3 px-4">Nội dung</th>
              <th className="py-3 px-4">Đối tượng</th>
              <th className="py-3 px-4">Thời gian</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((n) => (
                <tr
                  key={n.id}
                  className="border-b dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-200">
                    {n.id}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">
                    {n.title}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm max-w-[300px] truncate">
                    {n.message}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {n.audience}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{n.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusMap[n.status].color
                      }`}
                    >
                      {statusMap[n.status].label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center flex justify-center gap-3">
                    <button className="text-blue-500 hover:text-blue-600 transition">
                      <Eye size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-600 transition">
                      <Trash2 size={18} />
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
                  Không có thông báo nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationPage;
