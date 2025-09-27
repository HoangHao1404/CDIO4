import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";

// Layout & guards
import Layout from "./components/common/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
              <Route path="/devices" element={<DeviceManagerment />} />
              <Route path="/users" element={<UserManagerment />} />
              <Route path="/threshold" element={<ThresholdePage />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Setting />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
