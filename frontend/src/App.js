import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";

// Layout
import Layout from "./components/common/Layout";
import LayoutAdmin from "./components/common/LayoutAdmin";

// Pages
import Dashboard from "./pages/Dashboard";
import { DeviceManagerment } from "./pages/DeviceManagerment";
import { UserManagerment } from "./pages/UserManagerment";
import { ThresholdePage } from "./pages/ThresholdePage";
import AirQualityIndexPage from "./pages/AirQualityIndexPage";
import History from "./pages/History";
import Setting from "./components/common/Setting";
import Register from "./pages/Register";
import SignIn from "./pages/Sign_in";
import Public_page from "./pages/Public_page";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RequireAdmin from "./components/common/RequireAdmin";

function App() {
  return (
      <Routes>
        {/* Public */}
          <Route path="/" element={<Public_page />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/air-quality" element={<AirQualityIndexPage />} />  
              <Route path="/threshold" element={<ThresholdePage />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Setting />} />
            </Route>
          </Route>

           {/* Protected Admin Routes */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="users" element={<UserManagerment />} />
            <Route path="devices" element={<DeviceManagerment />} />
          </Route>
        </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
  );
}

export default App;
