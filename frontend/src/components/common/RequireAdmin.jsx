import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireAdmin() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Chưa đăng nhập → về trang SignIn
    return <Navigate to="/signin" replace />;
  }

  const isAdmin =
    user?.role?.includes("Admin") || user?.VaiTro?.includes("Admin");

  if (!isAdmin) {
    // Đã đăng nhập nhưng không phải admin → chặn
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; // Cho phép render route con của admin
}
