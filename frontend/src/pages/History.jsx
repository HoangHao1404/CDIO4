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
    {
      time: "01:00",
      temp: 27,
      humid: 20,
      co2: 702,
      pm25: 14,
      gas: 1,
      status: "Tốt",
    },
    {
      time: "02:00",
      temp: 26,
      humid: 22,
      co2: 682,
      pm25: 10,
      gas: 1,
      status: "Tốt",
    },
    {
      time: "03:00",
      temp: 26,
      humid: 22,
      co2: 713,
      pm25: 12,
      gas: 1,
      status: "Tốt",
    },
    {
      time: "04:00",
      temp: 26,
      humid: 21,
      co2: 694,
      pm25: 11,
      gas: 22,
      status: "Tốt",
    },
    {
      time: "05:00",
      temp: 30,
      humid: 14,
      co2: 1228,
      pm25: 16,
      gas: 62,
      status: "KLM",
    },
    {
      time: "06:00",
      temp: 39,
      humid: 3,
      co2: 1854,
      pm25: 23,
      gas: 87,
      status: "NH",
    },
    {
      time: "07:00",
      temp: 21,
      humid: 67,
      co2: 987,
      pm25: 24,
      gas: 5,
      status: "TB",
    },
    {
      time: "08:00",
      temp: 21,
      humid: 67,
      co2: 987,
      pm25: 24,
      gas: 5,
      status: "TB",
    },
  ];

  // state filter + data
  const [activeFilter, setActiveFilter] = useState("day");
  const [data, setData] = useState(originalData);

  // xử lý đổi filter
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    if (filter === "day") {
      setData(originalData.slice(0, 5)); // demo: lấy 5 record đầu
    } else if (filter === "week") {
      setData(originalData.slice(0, 7)); // demo: lấy 7 record
    } else if (filter === "month") {
      setData(originalData); // full
    }
  };

  return (
    <div>
      {/* Summary Cards */}
      <div className="w-full flex gap-4">
        {/* Card 1 */}
        <div className="flex-1 h-[120px] bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
          <p className="text-[#969696] text-2xl font-medium">Cao nhất</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold text-black">1225</p>
            <TrendUp size={36} color="#F4525C" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 h-[120px] bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
          <p className="text-[#969696] text-2xl font-medium">Trung bình</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold text-black">621</p>
            <Triangle size={36} color="#F49352" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 h-[120px] bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
          <p className="text-[#969696] text-2xl font-medium">Thấp nhất</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold text-black">122</p>
            <TrendDown size={36} color="#5DBD9A" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full h-[400px] bg-white rounded-2xl shadow p-4 mt-5 flex flex-col">
        {/* Header filter */}
        <div className="flex items-center justify-end mb-4 gap-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-[#F6F6F6] px-3 py-2 text-[#969696] text-sm hover:bg-gray-200 hover:text-black duration-300">
              <Calendar size={16} />
              28/08/2025
            </button>

            <div className="relative flex bg-gray-100 rounded-lg w-fit">
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

              {/* Buttons */}
              <button
                onClick={() => handleFilterChange("day")}
                className={`relative z-10 px-4 py-2 text-sm rounded-lg ${
                  activeFilter === "day" ? "text-black" : "text-[#969696]"
                }`}
              >
                Ngày
              </button>
              <button
                onClick={() => handleFilterChange("week")}
                className={`relative z-10 px-4 py-2 text-sm rounded-lg ${
                  activeFilter === "week" ? "text-black" : "text-[#969696]"
                }`}
              >
                Tuần
              </button>
              <button
                onClick={() => handleFilterChange("month")}
                className={`relative z-10 px-4 py-2 text-sm rounded-lg ${
                  activeFilter === "month" ? "text-black" : "text-[#969696]"
                }`}
              >
                Tháng
              </button>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-[#F6F6F6] rounded-lg px-3 py-2 text-[#969696] text-sm hover:bg-gray-200 hover:text-black duration-300">
            <Download size={16} />
            Xuất File
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-t-xl">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="sticky top-0 bg-gray-100 text-black  z-10">
              <tr>
                <th className="py-2 px-3 font-medium italic">Thời gian</th>
                <th className="py-2 px-3 font-medium">
                  Nhiệt độ
                  <span className="text-[#969696] font-normal"> (°C)</span>
                </th>
                <th className="py-2 px-3 font-medium">
                  Độ ẩm <span className="text-[#969696] font-normal"> (%)</span>
                </th>
                <th className="py-2 px-3 font-medium">
                  CO₂ <span className="text-[#969696] font-normal"> (ppm)</span>
                </th>
                <th className="py-2 px-3 font-medium">
                  PM2.5{" "}
                  <span className="text-[#969696] font-normal"> (µg/m³)</span>
                </th>
                <th className="py-2 px-3 font-medium">
                  Gas <span className="text-[#969696] font-normal"> (%)</span>
                </th>
                <th className="py-2 px-3 font-medium">Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-3">{row.time}</td>
                  <td className="py-2 px-3">{row.temp}</td>
                  <td className="py-2 px-3">{row.humid}</td>
                  <td
                    className={`py-2 px-3 ${
                      row.co2 > 1000 ? "text-red-500 font-medium" : ""
                    }`}
                  >
                    {row.co2}
                  </td>
                  <td className="py-2 px-3">{row.pm25}</td>
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
                        className={`w-3 h-3 rounded-full ${
                          statusColors[row.status]
                        }`}
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
      <footer className="h-12 pl-4 mt-5 flex gap-2 items-center rounded-xl shadow text-xs bg-white text-[#969696] ">
        <Info size={22} color="#969696" />
        Dữ liệu tham chiếu theo chuẩn WHO
      </footer>
    </div>
  );
};

export default History;
