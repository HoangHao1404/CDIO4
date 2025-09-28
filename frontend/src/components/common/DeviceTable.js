import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const mockDevices = [
  { id: "153", name: "CO2", spec: "Nồng độ (ppm)", status: "online" },
  { id: "154", name: "Bụi", spec: "Nồng độ (µg/m³)", status: "offline" },
  { id: "121", name: "O2", spec: "Nồng độ (%)", status: "online" },
  { id: "192", name: "Gas", spec: "Nồng độ (ppm)", status: "online" },
  { id: "057", name: "Co2", spec: "Nồng độ (ppm)", status: "online" },
  { id: "122", name: "O2", spec: "Nồng độ (%)", status: "online" },
  { id: "297", name: "Nhiệt độ", spec: "°C", status: "offline" },
  { id: "354", name: "O2", spec: "Nồng độ (%)", status: "offline" },
];

export default function DeviceTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDevices = mockDevices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColor = {
    online: "bg-green-400",
    offline: "bg-red-400",
  };

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

      {/* Table section */}
      <div className="overflow-x-auto border rounded-lg">
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
            {filteredDevices.map((device) => (
              <tr key={device.id} className="border-t">
                <td className="p-3 italic">{device.id}</td>
                <td className="p-3 font-medium">{device.name}</td>
                <td className="p-3">{device.spec}</td>
                <td className="p-3">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColor[device.status]}`}
                  ></span>
                  {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                </td>
                <td className="p-3 flex gap-2">
                  <button title="Sửa" className="text-blue-500 hover:text-blue-600">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button title="Xoá" className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal thêm thiết bị */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Thêm Thiết Bị</h2>

            <form onSubmit={handleAddDevice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên Thiết Bị</label>
                <input type="text" className="w-full border rounded-md px-3 py-2" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Thông số kỹ thuật</label>
                <input type="text" className="w-full border rounded-md px-3 py-2" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
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
