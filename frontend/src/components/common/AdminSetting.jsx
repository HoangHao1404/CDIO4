import React from "react";
import { ChartLine, Shield, Bell, Palette, ArrowUpRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const AdminSetting = () => {
  const { theme } = useTheme();

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
    <div
      className="
        min-h-screen w-full flex flex-col justify-start p-8 pb-10
        rounded-[25px]
        bg-gray-50 dark:bg-[#181818]
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        dark:shadow-[0_4px_16px_rgba(255,255,255,0.05)]
        transition-all duration-500
      "
    >
      <div className="flex flex-col gap-[20px]">
        {settingItems.map((item) => (
          <SettingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const SettingCard = ({ item }) => {
  const IconComponent = item.icon;

  return (
    <button
      onClick={item.onClick}
      className="
        w-full flex items-center justify-between px-[20px] py-[16px]
        rounded-[20px] border-[0.5px] border-solid
        bg-white border-[#d9d9d9] shadow-[2px_5px_12px_0px_rgba(0,0,0,0.1)]
        hover:shadow-[2px_5px_15px_0px_rgba(0,0,0,0.15)]
        dark:bg-[#242424] dark:border-[#2f2f2f]
        dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)]
        dark:hover:shadow-[0_4px_14px_rgba(255,255,255,0.08)]
        transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group
      "
    >
      {/* Icon + tiêu đề bên trái */}
      <div className="flex gap-[15px] items-center">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <IconComponent
            size={24}
            className="
              text-gray-700 group-hover:text-gray-900
              dark:text-zinc-300 dark:group-hover:text-white
              transition-colors duration-300
            "
          />
        </div>

        <div
          className="
            font-['Inter'] font-normal text-[18px]
            text-black dark:text-zinc-200
            transition-colors duration-300
          "
        >
          {item.title}
        </div>
      </div>

      {/* Icon mũi tên */}
      <div className="w-[24px] h-[24px] flex items-center justify-center">
        <ArrowUpRight
          size={24}
          className="
            text-gray-600 group-hover:text-gray-800
            dark:text-zinc-400 dark:group-hover:text-zinc-100
            group-hover:translate-x-1 group-hover:-translate-y-1
            transition-all duration-300
          "
        />
      </div>
    </button>
  );
};

export default AdminSetting;
