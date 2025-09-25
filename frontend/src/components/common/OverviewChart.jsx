import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Dữ liệu mẫu
const data = [
  { time: "10am", value: 50 },
  { time: "11am", value: 30 },
  { time: "12am", value: 55 },
  { time: "01am", value: 35 },
  { time: "02am", value: 20 },
  { time: "03am", value: 60 },
  { time: "04am", value: 15 },
];

const OverviewChart = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 40, left: -10, bottom: 0 }}
      >
        {/* Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />

        {/* Trục */}
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />

        {/* Gradient màu cho line */}
        <defs>
          <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E36363" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#8884d8" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        {/* Vẽ line */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="url(#colorLine)"
          strokeWidth={3}
          dot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 3, fill: "#fff" }}
          activeDot={{ r: 8, stroke: "#8b5cf6", strokeWidth: 3, fill: "#fff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
