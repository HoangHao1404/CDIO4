import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Dữ liệu mẫu
const data = [
  { name: "Tốt", value: 20, color: "#CCF067" }, // xanh lá nhạt
  { name: "Trung bình", value: 15, color: "#F2C31B" }, // vàng
  { name: "Không lành mạnh", value: 37, color: "#F49352" }, // cam
  { name: "Nguy hiểm", value: 28, color: "#F4525C" }, // đỏ
];

const QualityChart = () => {
  // Tính % chính (tạm thời set cố định = 37% từ design)
  const mainValue = 37;
  const mainLabel = "Không lành mạnh";

  return (
    <div className="w-full h-[400px] relative flex flex-col justify-center">
      <ResponsiveContainer>
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={130}
            outerRadius={150}
            startAngle={90}
            endAngle={-270}
            paddingAngle={3}
            cornerRadius={20}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Text hiển thị ở giữa */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[180px]">
        <div className="text-4xl font-bold">{mainValue}%</div>
        <div className="text-lg mt-[5px]">{mainLabel}</div>
      </div>

      {/* chú thích */}
      <div className="flex justify-center gap-5">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-[5px]">
            <div
              className="w-[14px] h-[14px] rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualityChart;
