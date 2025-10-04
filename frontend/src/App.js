import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// Import các providers
import { AuthProvider } from "./context/AuthContext";

// Import các components
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Sign_in";
import Register from "./pages/Register"; // THÊM IMPORT NÀY
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import UserTable from "./components/common/UserTable";
import { DeviceManagerment } from "./pages/DeviceManagerment";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes công khai - không cần layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />

          {/* Routes có layout - Dashboard chính */}
          <Route path="/*" element={
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <Navbar />
              <div className="fixed top-28 left-[250px] right-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<UserTable />} />
                  <Route path="/devices" element={<DeviceManagerment />} />
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
