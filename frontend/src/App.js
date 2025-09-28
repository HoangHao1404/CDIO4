// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import "./styles/App.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import UserTable from "./components/common/UserTable";
import { DeviceManagerment } from "./pages/DeviceManagerment";

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <Navbar />
      <div className="fixed top-28 left-[250px] right-4">
        {/* <Dashboard/> */}
        <UserTable/>
        {/* <DeviceManagerment/> */}

      </div>
    </div>
  );
}
export default App;