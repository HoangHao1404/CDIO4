import React from "react";
import CardData from "../components/common/CardData";
import OverviewChart from "../components/common/OverviewChart";
import QualityChart from "../components/common/QualityChart";

const Dashboard = () => {
  const sensorData = [
    { title: "CO₂", value: 735, unit: "ppm", percent: 25 },
    { title: "PM2.5", value: 18, unit: "µg/m³", percent: 40 },
    { title: "Gas", value: 0.62, unit: "ppm", percent: 35 },
    { title: "Nhiệt độ", value: 28.5, unit: "°C", percent: 55 },
    { title: "Độ ẩm", value: 70, unit: "%", percent: 70 },
  ];

  return (
    <div className="transition-colors duration-300">
      {/* ✅ Dãy 5 thẻ dữ liệu */}
      <div className="w-full flex flex-nowrap gap-4 ">
        {sensorData.map((item, index) => (
          <CardData
            key={index}
            title={item.title}
            value={item.value}
            unit={item.unit}
            percent={item.percent}
          />
        ))}
      </div>

      {/* ✅ Biểu đồ */}
      <div className="w-full min-h-[450px] flex gap-4 mt-4">
        {/* 🔹 Thẻ biểu đồ Overview */}
        <div
          className="w-2/3 flex flex-col 
                     bg-white dark:bg-zinc-800 
                     rounded-[20px] shadow-lg p-4 
                     transition-colors duration-300"
        >
          <p className="text-md text-[#969696] dark:text-zinc-300 font-medium">
            Overview
          </p>
          <div className="flex-1 flex items-center justify-center">
            <OverviewChart />
          </div>
        </div>

        {/* 🔹 Thẻ biểu đồ Quality */}
        <div
          className="w-1/3 
                     bg-white dark:bg-zinc-800 
                     rounded-[20px] shadow-lg p-4 
                     transition-colors duration-300"
        >
          <p className="text-md text-[#969696] dark:text-zinc-300 font-medium">
            Quality
          </p>
          <div className="flex-1 flex items-center justify-center">
            <QualityChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
