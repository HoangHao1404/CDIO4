import { useState } from "react";
import {
  Calendar,
  Download,
  Info,
  TrendDown,
  TrendUp,
  Triangle,
} from "phosphor-react";

// map status -> màu
const statusColors = {
  Tốt: "bg-[#ccf067]",
  KLM: "bg-[#F49352]",
  NH: "bg-[#F4525C]",
  TB: "bg-[#FF8F6B]",
};

const History = () => {
  const originalData = [
    { time: "01:00", temp: 27, humid: 20, co2: 702, pm25: 14, gas: 1, status: "Tốt" },
    { time: "02:00", temp: 26, humid: 22, co2: 682, pm25: 10, gas: 1, status: "Tốt" },
    { time: "03:00", temp: 26, humid: 22, co2: 713, pm25: 12, gas: 1, status: "Tốt" },
    { time: "04:00", temp: 26, humid: 21, co2: 694, pm25: 11, gas: 22, status: "Tốt" },
    { time: "05:00", temp: 30, humid: 14, co2: 1228, pm25: 16, gas: 62, status: "KLM" },
    { time: "06:00", temp: 39, humid: 3, co2: 1854, pm25: 23, gas: 87, status: "NH" },
    { time: "07:00", temp: 21, humid: 67, co2: 987, pm25: 24, gas: 5, status: "TB" },
    { time: "08:00", temp: 21, humid: 67, co2: 987, pm25: 24, gas: 5, status: "TB" },
  ];

  const [activeFilter, setActiveFilter] = useState("day");
  const [data, setData] = useState(originalData);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "day") setData(originalData.slice(0, 5));
    else if (filter === "week") setData(originalData.slice(0, 7));
    else setData(originalData);
  };

  const handleExport = () => {
    const headers = [
      "Thời gian",
      "Nhiệt độ (°C)",
      "Độ ẩm (%)",
      "CO₂ (ppm)",
      "PM2.5 (µg/m³)",
      "Gas (%)",
      "Tình trạng",
    ];
    const rows = data.map((row) => [
      row.time,
      row.temp,
      row.humid,
      row.co2,
      row.pm25,
      row.gas,
      row.status,
    ]);
    const csvContent = [headers, ...rows]
      .map((e) => e.map(String).map((s) => `"${s.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full max-h-screen transition-colors duration-300">
      {/* Summary Cards */}
      <div className="w-full flex gap-4">
        {/* Card 1 */}
        <div className="flex-1 h-[120px] bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 flex flex-col justify-between transition-colors">
          <p className="text-[#969696] dark:text-zinc-300 text-2xl font-medium">
            Cao nhất
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold text-black dark:text-white">1225</p>
            <TrendUp size={36} color="#F4525C" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 h-[120px] bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 flex flex-col justify-between transition-colors">
          <p className="text-[#969696] dark:text-zinc-300 text-2xl font-medium">
            Trung bình
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold text-black dark:text-white">621</p>
            <Triangle size={36} color="#F49352" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 h-[120px] bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 flex flex-col justify-between transition-colors">
          <p className="text-[#969696] dark:text-zinc-300 text-2xl font-medium">
            Thấp nhất
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold text-black dark:text-white">122</p>
            <TrendDown size={36} color="#5DBD9A" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full h-[400px] bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 mt-5 flex flex-col transition-colors duration-300">
        {/* Header filter */}
        <div className="flex items-center justify-end mb-4 gap-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-[#F6F6F6] dark:bg-zinc-700 px-3 py-2 text-[#969696] dark:text-zinc-300 text-sm hover:bg-gray-200 dark:hover:bg-zinc-600 duration-300">
              <Calendar size={16} />
              28/08/2025
            </button>

            <div className="relative flex bg-gray-100 dark:bg-zinc-700 rounded-lg w-fit transition">
              <div
                className={`absolute top-0 left-0 h-full w-1/3 bg-[#CCF067] rounded-lg transition-transform duration-300 ease-in-out`}
                style={{
                  transform:
                    activeFilter === "day"
                      ? "translateX(0%)"
                      : activeFilter === "week"
                      ? "translateX(100%)"
                      : "translateX(200%)",
                }}
              />

              <button
                onClick={() => handleFilterChange("day")}
                className={`relative z-10 px-4 py-2 text-sm rounded-lg ${
                  activeFilter === "day"
                    ? "text-black dark:text-white"
                    : "text-[#969696] dark:text-zinc-400"
                }`}
              >
                Ngày
              </button>
              <button
                onClick={() => handleFilterChange("week")}
                className={`relative z-10 px-4 py-2 text-sm rounded-lg ${
                  activeFilter === "week"
                    ? "text-black dark:text-white"
                    : "text-[#969696] dark:text-zinc-400"
                }`}
              >
                Tuần
              </button>
              <button
                onClick={() => handleFilterChange("month")}
                className={`relative z-10 px-4 py-2 text-sm rounded-lg ${
                  activeFilter === "month"
                    ? "text-black dark:text-white"
                    : "text-[#969696] dark:text-zinc-400"
                }`}
              >
                Tháng
              </button>
            </div>
          </div>

          <button
            className="flex items-center gap-2 bg-[#F6F6F6] dark:bg-zinc-700 rounded-lg px-3 py-2 text-[#969696] dark:text-zinc-300 text-sm hover:bg-gray-200 dark:hover:bg-zinc-600 duration-300"
            onClick={handleExport}
          >
            <Download size={16} />
            Xuất File
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto border border-gray-200 dark:border-zinc-700 rounded-t-xl">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="sticky top-0 bg-gray-100 dark:bg-zinc-700 text-black dark:text-white z-10">
              <tr>
                {[
                  "Thời gian",
                  "Nhiệt độ (°C)",
                  "Độ ẩm (%)",
                  "CO₂ (ppm)",
                  "PM2.5 (µg/m³)",
                  "Gas (%)",
                  "Tình trạng",
                ].map((h) => (
                  <th key={h} className="py-2 px-3 font-medium italic">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  <td className="py-2 px-3">{row.time}</td>
                  <td>{row.temp}</td>
                  <td>{row.humid}</td>
                  <td
                    className={`py-2 px-3 ${
                      row.co2 > 1000 ? "text-red-500 font-medium" : ""
                    }`}
                  >
                    {row.co2}
                  </td>
                  <td>{row.pm25}</td>
                  <td
                    className={`py-2 px-3 ${
                      row.gas > 50 ? "text-red-500 font-medium" : ""
                    }`}
                  >
                    {row.gas}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center justify-start gap-2 ml-20">
                      <span
                        className={`w-3 h-3 rounded-full ${statusColors[row.status]}`}
                      />
                      {row.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <footer className="h-12 pl-4 mt-5 flex gap-2 items-center rounded-xl shadow text-xs bg-white dark:bg-zinc-800 text-[#969696] dark:text-zinc-400 transition-colors duration-300">
        <Info size={22} color="#969696" />
        Dữ liệu tham chiếu theo chuẩn WHO
      </footer>
    </div>
  );
};

export default History;
