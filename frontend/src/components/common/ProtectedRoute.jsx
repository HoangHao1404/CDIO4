import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Route guard:
 * - Đang loading: chưa render gì (có thể thay spinner)
 * - Chưa đăng nhập: chuyển /signin và giữ đường dẫn cũ (returnTo)
 * - Đã đăng nhập: render children (<Outlet/>)
 */
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // hoặc spinner toàn màn hình

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ returnTo: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}
