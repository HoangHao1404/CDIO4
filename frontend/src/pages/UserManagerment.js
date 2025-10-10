import React from "react";
import UserTable from "../components/common/UserTable";
import { useTheme } from "../context/ThemeContext";

export const UserManagerment = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`container mx-auto px-6 py-8 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${
          theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-white text-gray-800"
        }`}
      >
        <UserTable />
      </div>
    </div>
  );
};
