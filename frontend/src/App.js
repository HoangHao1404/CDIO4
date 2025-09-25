// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Import styles
import "./styles/App.css";

import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div
      className="App bg-gray-100"
      style={{
        fontFamily:
          "Inter, Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      <Navbar />
      <Sidebar />
      <div className="fixed top-28 left-[250px] right-4">
        {/* <History /> */}
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
