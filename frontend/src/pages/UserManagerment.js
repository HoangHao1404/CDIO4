import React from "react";
import UserTable from "../components/common/UserTable";

export const UserManagerment = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-6 py-8 transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6">
        <UserTable />
      </div>
    </div>
  );
};
