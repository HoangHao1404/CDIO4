import { useAuth } from "../../context/AuthContext";
export default function RoleGuard({ roles = [], children }) {
  const { user } = useAuth();
  const ok = user?.role && roles.includes(user.role);
  return ok ? children : null;
}
