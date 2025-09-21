// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Import styles
import "./styles/App.css";
import AirQualityIndexPage from "./pages/AirQualityIndexPage";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div
      className="App bg-gray-100"
      style={{
        fontFamily:
          "Inter, Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      <Router>
        <Navbar />
        <Sidebar />
        <main className="ml-[250px] pt-[120px] px-6 h-screen overflow-y-hidden">
          <div className="h-full max-w-[1280px] mx-auto">
            <Routes>
              <Route path="/air-quality" element={<AirQualityIndexPage />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
