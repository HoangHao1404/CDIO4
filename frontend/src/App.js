// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import "./styles/App.css";

import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import Layout from "./components/common/Layout";
import Setting from "./components/common/Setting";

function App() {
  return (
    <div
      className="App bg-gray-100"
      style={{
        fontFamily:
          "Inter, Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      <Layout>
        {/* <Setting/> */}
      </Layout>
    </div>
  );
}
export default App;