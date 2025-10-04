import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deviceAPI } from "../../services/deviceAPI";

export default function DeviceTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch dữ liệu khi component mount hoặc các filter thay đổi
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        const result = await deviceAPI.getAll({
          search,
          status: statusFilter,
          page,
        });
        setRows(result.devices);
        setPagination(result.pagination);
        setError(null);
      } catch (err) {
        setError(err.message || "Không thể tải dữ liệu thiết bị");
        console.error("❌ Lỗi khi tải danh sách thiết bị:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search để tránh gọi API liên tục khi gõ
    const handler = setTimeout(() => {
      fetchDevices();
    }, 300);

    return () => clearTimeout(handler);
  }, [search, statusFilter, page]);

  // Xử lý hiển thị trạng thái thiết bị - dựa trên trạng thái cảm biến
  const getDeviceStatus = (device) => {
    if (!device.camBien || device.camBien.length === 0) {
      return { text: "Không có cảm biến", color: "bg-gray-400" };
    }

    // Nếu có ít nhất 1 cảm biến online, thiết bị được coi là online
    const hasOnlineSensor = device.camBien.some(
      (sensor) => sensor.TrangThai === "online"
    );

    if (hasOnlineSensor) {
      return { text: "Online", color: "bg-green-400" };
    } else {
      return { text: "Offline", color: "bg-red-400" };
    }
  };

  // Xử lý hiển thị thông số kỹ thuật
  const getDeviceSpec = (device) => {
    if (!device.camBien || device.camBien.length === 0) {
      return "Không có dữ liệu";
    }

    // Lấy thông số kỹ thuật từ cảm biến đầu tiên
    return device.camBien[0].ThongSoKyThuat || "Không có dữ liệu";
  };

  // Xử lý thêm thiết bị mới (sẽ triển khai sau)
  const handleAddDevice = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header filter row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm bằng tên thiết bị"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:max-w-sm bg-gray-100"
        />

        <div className="flex gap-3 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-md bg-gray-100"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            + Thêm thiết bị
          </button>
        </div>
      </div>

      {/* Table section với loading states */}
      <div className="overflow-x-auto border rounded-lg">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-500">Đang tải dữ liệu thiết bị...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            <p className="font-bold">❌ Lỗi khi tải dữ liệu</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Không có thiết bị nào phù hợp với tiêu chí tìm kiếm</p>
          </div>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 italic">ID</th>
                <th className="p-3">Tên Thiết Bị</th>
                <th className="p-3">Thông số kỹ thuật</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((device) => {
                const status = getDeviceStatus(device);
                return (
                  <tr key={device._id} className="border-t">
                    <td className="p-3 italic">{device._id}</td>
                    <td className="p-3 font-medium">{device.TenThietBi}</td>
                    <td className="p-3">{getDeviceSpec(device)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${status.color}`}
                      ></span>
                      {status.text}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        title="Sửa"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        title="Xoá"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal thêm thiết bị (giữ nguyên từ code cũ) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Thêm Thiết Bị</h2>

            <form onSubmit={handleAddDevice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên Thiết Bị
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Thông số kỹ thuật
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Trạng thái
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
