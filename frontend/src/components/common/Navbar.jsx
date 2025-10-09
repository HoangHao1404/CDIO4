import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Cloud, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Avatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5"
    onError={(e) => (e.currentTarget.style.display = "none")}
  />
);

export default function NavbarAirZen() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [openUser, setOpenUser] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);

  // ===============================
  // WEATHER & DATE 
  // ===============================
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60 * 1000); // cập nhật mỗi phút
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d) =>
    d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

  // ===============================
  // 🔔 NOTIFICATION 
  // ===============================
  const [noti, setNoti] = useState([
    {
      id: "1",
      title: "CO₂ vượt ngưỡng",
      message: "Phòng khách: 1200 ppm > 1000 ppm.",
      severity: "warning",
      createdAt: new Date().toISOString(),
      unread: true,
    },
    {
      id: "2",
      title: "PM2.5 nguy hiểm",
      message: "45.7 μg/m³ – Nên bật máy lọc.",
      severity: "critical",
      createdAt: new Date(Date.now() - 3600e3).toISOString(),
      unread: true,
    },
  ]);

  const markAllRead = () =>
    setNoti((prev) => prev.map((n) => ({ ...n, unread: false })));

  const handleLogout = () => {
    logout();
    setOpenUser(false);
    navigate("/signin");
  };

  // ===============================
  // 🧭 NAVBAR UI
  // ===============================
  return (
    <header
      className="fixed top-7 left-[250px] right-4 z-40"
      style={{ transition: "background-color 300ms ease, color 300ms ease" }}
    >
      <div
        className="rounded-3xl bg-white/90 dark:bg-zinc-900 
                   shadow px-4 py-2 flex items-center justify-end gap-3"
        style={{ height: "70px" }}
      >
        {/* WEATHER */}
        <div
          className="hidden sm:flex items-center gap-2 rounded-full 
                        bg-zinc-100/90 dark:bg-zinc-700 
                        text-zinc-700 dark:text-zinc-200 
                        px-4 py-2 shadow-inner"
        >
          <Cloud className="h-4 w-4 opacity-70" />
          <span className="text-sm">26°C</span>
          <span className="text-zinc-400">|</span>
          <span className="text-sm">{formatDate(currentDate)}</span>
        </div>

        {/* 🔔 Notification */}
        <div className="relative">
          <button
            onClick={() => setOpenNoti((v) => !v)}
            className="relative h-10 w-10 rounded-full 
                     bg-white dark:bg-zinc-700 
                     border border-zinc-200 dark:border-zinc-600 
                     shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600"
          >
            <Bell className="mx-auto h-5 w-5 text-zinc-800 dark:text-zinc-200" />
            {noti.some((n) => n.unread) && (
              <span className="absolute -top-0.5 -right-0.5 inline-block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {openNoti && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-2xl border border-zinc-200 dark:border-zinc-600 
                         bg-white/90 dark:bg-zinc-800/95 backdrop-blur shadow-lg p-2"
            >
              <div className="flex items-center justify-between px-2 py-1">
                <p className="text-sm font-semibold dark:text-white">
                  Thông báo
                </p>
                <button
                  onClick={markAllRead}
                  className="text-xs rounded-full px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-zinc-300"
                >
                  Đánh dấu đã đọc
                </button>
              </div>

              <div className="max-h-80 overflow-auto pr-1">
                {noti.length === 0 ? (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 px-3 py-6 text-center">
                    Không có thông báo
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {noti.map((n) => (
                      <li
                        key={n.id}
                        className={`flex gap-3 rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 ${
                          n.unread ? "bg-zinc-50 dark:bg-zinc-700" : ""
                        }`}
                      >
                        <div className="pt-1">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              n.severity === "critical"
                                ? "bg-rose-500"
                                : n.severity === "warning"
                                ? "bg-amber-500"
                                : "bg-sky-500"
                            }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate dark:text-white">
                            {n.title}
                          </p>
                          {n.message && (
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 overflow-hidden text-ellipsis">
                              {n.message}
                            </p>
                          )}
                          <p className="text-[10px] text-zinc-400 mt-1">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 👤 User */}
        <div className="relative">
          <button
            onClick={() => setOpenUser((v) => !v)}
            className="group flex items-center gap-3 
                       rounded-full 
                       bg-amber-50 dark:bg-zinc-700 
                       px-4 py-2 shadow-sm 
                       hover:bg-amber-100 dark:hover:bg-zinc-600"
          >
            <span className="text-sm text-zinc-800 dark:text-zinc-200">
              Xin chào,{" "}
              <span className="font-semibold">
                {user?.name || "Người dùng"}
              </span>{" "}
              👋
            </span>
          </button>

          {openUser && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-2xl 
                          border border-zinc-200 dark:border-zinc-600 
                          bg-white/95 dark:bg-zinc-800 
                          backdrop-blur shadow-lg p-2"
            >
              <ul className="space-y-1">
                <li>
                  <button
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 
                                     hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm dark:text-zinc-200"
                  >
                    <User className="h-4 w-4" /> Hồ sơ
                  </button>
                </li>
                <li>
                  <button
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 
                                     hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm dark:text-zinc-200"
                  >
                    <Settings className="h-4 w-4" /> Cài đặt
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 
                               hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm dark:text-zinc-200"
                  >
                    {theme === "light" ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                    {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 
                               hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm text-rose-600"
                  >
                    <LogOut className="h-4 w-4" /> Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
