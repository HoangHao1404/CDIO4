// src/App.js (hoặc App.jsx)

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Styles
import "./styles/App.css";

// Layout
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AirQualityIndexPage from "./pages/AirQualityIndexPage";

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
        {/* Global fixed layout components */}
        <Navbar />
        <Sidebar />

        {/* Main content area aligned with fixed Navbar + Sidebar */}
        <main className="ml-[250px] pt-[120px] px-6 h-screen overflow-y-auto">
          <div className="h-full max-w-[1280px] mx-auto">
            <Routes>
              {/* Pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/air-quality" element={<AirQualityIndexPage />} />

              {/* Default route -> dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
