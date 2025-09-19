// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import "./styles/App.css";
import Sidebar from "./components/common/Sidebar";
import NavbarAirZen from "./components/common/Navbar";
import { ThresholdePage } from "./pages/ThresholdePage";
import { UserManagerment } from "./pages/UserManagerment";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="w-full flex justify-center px-4">
          <NavbarAirZen />
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* <ThresholdePage /> */}
          <UserManagerment/>
        </main>
      </div>
    </div>
  );
}

export default App;
