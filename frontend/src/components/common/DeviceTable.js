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

  // THÊM CÁC STATE BỊ THIẾU
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  // Danh sách thông số kỹ thuật theo yêu cầu
  const thongSoKyThuatOptions = [
    { value: "Nhiệt độ (°C)", label: "Nhiệt độ (°C)" },
    { value: "Nồng độ (ppm)", label: "Nồng độ (ppm)" },
    { value: "Nồng độ (%)", label: "Nồng độ (%)" },
    { value: "Nồng độ (μg/m³)", label: "Nồng độ (μg/m³)" },
  ];

  // State cho form thêm thiết bị
  const [newDevice, setNewDevice] = useState({
    TenThietBi: "",
    ThongSoKyThuat: "",
    TrangThai: "offline"
  });

  // Xử lý thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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

  // CẬP NHẬT HÀM XỬ LÝ THÊM THIẾT BỊ
  const handleAddDevice = async (e) => {
    e.preventDefault();
    
    // Validation cơ bản
    if (!newDevice.TenThietBi.trim()) {
      setAddError("Tên thiết bị không được để trống");
      return;
    }
    
    if (!newDevice.ThongSoKyThuat) {
      setAddError("Vui lòng chọn thông số kỹ thuật");
      return;
    }

    setAddLoading(true);
    setAddError("");

    try {
      // Gọi API để tạo thiết bị mới
      const createdDevice = await deviceAPI.create({
        TenThietBi: newDevice.TenThietBi,
        ThongSoKyThuat: newDevice.ThongSoKyThuat,
        TrangThai: newDevice.TrangThai
      });

      // Thêm thiết bị mới vào đầu danh sách
      setRows((prevRows) => [createdDevice, ...prevRows]);

      // Reset form và đóng modal
      setNewDevice({
        TenThietBi: "",
        ThongSoKyThuat: "",
        TrangThai: "offline"
      });
      setIsModalOpen(false);
      
      console.log("✅ Thêm thiết bị thành công");
      
    } catch (err) {
      setAddError(err.message || "Không thể tạo thiết bị mới");
      console.error("❌ Lỗi khi tạo thiết bị:", err);
    } finally {
      setAddLoading(false);
    }
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

      {/* Modal thêm thiết bị */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Thêm Thiết Bị</h2>

            <form onSubmit={handleAddDevice} className="space-y-4">
              {/* Hiển thị lỗi nếu có */}
              {addError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {addError}
                </div>
              )}

              {/* Tên thiết bị */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên Thiết Bị
                </label>
                <input
                  type="text"
                  name="TenThietBi"
                  value={newDevice.TenThietBi}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ví dụ: Máy đo khí Gas để cháy"
                  required
                />
              </div>

              {/* Thông số kỹ thuật - DROPDOWN */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Thông số kỹ thuật
                </label>
                <select
                  name="ThongSoKyThuat"
                  value={newDevice.ThongSoKyThuat}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Chọn thông số kỹ thuật --</option>
                  {thongSoKyThuatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trạng thái */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Trạng thái
                </label>
                <select
                  name="TrangThai"
                  value={newDevice.TrangThai}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="error">Lỗi</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>

              {/* Nút hành động */}
              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewDevice({
                      TenThietBi: "",
                      ThongSoKyThuat: "",
                      TrangThai: "offline"
                    });
                    setAddError("");
                  }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  disabled={addLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                  disabled={addLoading}
                >
                  {addLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang thêm...
                    </>
                  ) : (
                    "Thêm"
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
