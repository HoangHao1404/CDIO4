import React from "react";
import ThresholdCard from "../components/common/ThresholdeCard";

export const ThresholdePage = () => {
  const handleSave = (type, value) => {
    console.log(`Saved ${type}: ${value}`);
  };

  return (
    <div
      className="
        p-6 min-h-screen 
        rounded-[25px]
        bg-zinc-50 dark:bg-[#181818]
        text-zinc-900 dark:text-zinc-100
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        dark:shadow-[0_4px_16px_rgba(255,255,255,0.05)]
        transition-all duration-500
      "
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {/* CO₂ */}
          <ThresholdCard
            title="CO₂"
            defaultValue={2000}
            unit="ppm"
            value="2000"
            infoText="Ngưỡng CO₂ tối đa là 2000 ppm. Theo khuyến nghị của Bộ Y tế Việt Nam."
            onSave={(v) => handleSave('co2', v)}
            className="bg-white dark:bg-zinc-800 dark:border-zinc-700 transition-colors"
          />

          {/* PM2.5 */}
          <ThresholdCard
            title="PM2.5"
            defaultValue={250}
            unit="µg/m³"
            value="250"
            infoText="Ngưỡng PM2.5 không vượt quá 250 µg/m³ (khuyến nghị WHO)."
            onSave={(v) => handleSave('pm25', v)}
            className="bg-white dark:bg-zinc-800 dark:border-zinc-700 transition-colors"
          />

          {/* Gas */}
          <ThresholdCard
            title="Gas"
            defaultValue={10}
            unit="%"
            value="10"
            infoText="Ngưỡng khí gas trong không khí an toàn là 80%."
            onSave={(v) => handleSave('gas', v)}
            className="bg-white dark:bg-zinc-800 dark:border-zinc-700 transition-colors"
          />

          {/* Nhiệt độ */}
          <ThresholdCard
            title="Nhiệt độ"
            defaultValue={40}
            unit="°C"
            value="40"
            infoText="Nhiệt độ không nên vượt quá 40°C trong nhà ở."
            onSave={(v) => handleSave('temp', v)}
            className="bg-white dark:bg-zinc-800 dark:border-zinc-700 transition-colors"
          />

          {/* Độ ẩm */}
          <ThresholdCard
            title="Độ ẩm"
            defaultValue={70}
            unit="%"
            value="70"
            infoText="Độ ẩm lý tưởng dao động từ 40% đến 70%."
            onSave={(v) => handleSave('humidity', v)}
            className="bg-white dark:bg-zinc-800 dark:border-zinc-700 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
