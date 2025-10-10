import React from "react";
import UserTable from "../components/common/UserTable";
import { useTheme } from "../context/ThemeContext";

export const UserManagerment = () => {
  const { theme } = useTheme();

  return (
    <div className="
        min-h-screen w-full p-4 md:p-6
        rounded-[25px]
        bg-gradient-to-b from-gray-50 to-white
        dark:from-[#181818] dark:to-[#121212]
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        dark:shadow-[0_4px_16px_rgba(255,255,255,0.05)]
        transition-all duration-500
        text-gray-800 dark:text-gray-100
      ">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6">
        <UserTable />
      </div>
    </div>
  );
};
