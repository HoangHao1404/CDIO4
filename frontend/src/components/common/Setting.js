import React from "react";
import { ChartLine, Shield, Bell, Palette, ArrowUpRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Setting = () => {
  const { theme } = useTheme();

  // Cấu hình các mục cài đặt theo đúng thiết kế Figma
  const settingItems = [
    {
      id: "data-collection",
      title: "Thu thập dữ liệu",
      icon: ChartLine,
      onClick: () => console.log("Mở cài đặt thu thập dữ liệu"),
    },
    {
      id: "security",
      title: "Bảo mật",
      icon: Shield,
      onClick: () => console.log("Mở cài đặt bảo mật"),
    },
    {
      id: "notifications",
      title: "Thông báo",
      icon: Bell,
      onClick: () => console.log("Mở cài đặt thông báo"),
    },
    {
      id: "interface",
      title: "Giao diện",
      icon: Palette,
      onClick: () => console.log("Mở cài đặt giao diện"),
    },
  ];

  return (
    <div className="h-full flex flex-col justify-center p-8 pb-10">
      <div className="flex flex-col gap-[20px] justify-center">
        {settingItems.map((item) => (
          <SettingCard key={item.id} item={item} theme={theme} />
        ))}
      </div>
    </div>
  );
};

// Component card riêng cho mỗi mục cài đặt theo đúng thiết kế Figma
const SettingCard = ({ item, theme }) => {
  const IconComponent = item.icon;

  return (
    <button
      onClick={item.onClick}
      className="bg-white border-[#d9d9d9] border-[0.5px] border-solid rounded-[20px] shadow-[2px_5px_12px_0px_rgba(0,0,0,0.1)] w-full flex items-center justify-between px-[20px] py-[16px] hover:shadow-[2px_5px_15px_0px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group"
    >
      {/* Phần trái: Icon và tiêu đề */}
      <div className="flex gap-[15px] items-center">
        {/* Icon container */}
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <IconComponent
            size={24}
            className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
          />
        </div>

        {/* Tiêu đề */}
        <div className="font-['Inter'] font-normal text-[18px] text-black leading-[0]">
          {item.title}
        </div>
      </div>

      {/* Icon mũi tên */}
      <div className="w-[24px] h-[24px] flex items-center justify-center">
        <ArrowUpRight
          size={24}
          className="text-gray-600 group-hover:text-gray-800 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
        />
      </div>
    </button>
  );
};

export default Setting;
