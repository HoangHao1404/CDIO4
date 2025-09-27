// ==================================================//
import React, { useState } from "react";
import { Bell, Cloud, Moon, Settings, Sun, User, LogOut } from "lucide-react";
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

  const [openUser, setOpenUser] = useState(false);

  return (
    <header
      className="fixed top-7 left-[250px] right-4 z-40"
      style={{ transition: "background-color 300ms ease, color 300ms ease" }}
    >
      <div
        className="rounded-3xl bg-white/90 dark:bg-zinc-900 shadow px-4 py-2 flex items-center justify-end gap-3"
        style={{ height: "70px" }}
      >
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-100/90 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 px-4 py-2 shadow-inner">
          <Cloud className="h-4 w-4 opacity-70" />
          <span className="text-sm">26°C</span>
          <span className="text-zinc-400">|</span>
          <span className="text-sm">26 thg 9, 25</span>
        </div>

        <button className="relative h-10 w-10 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600">
          <Bell className="mx-auto h-5 w-5 text-zinc-800 dark:text-zinc-200" />
          <span className="absolute -top-0.5 -right-0.5 inline-block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpenUser((v) => !v)}
            className="group flex items-center gap-3 rounded-full bg-amber-50 dark:bg-zinc-700 px-4 py-2 shadow-sm hover:bg-amber-100 dark:hover:bg-zinc-600"
          >
            <span className="text-sm text-zinc-800 dark:text-zinc-200">
              Xin chào,{" "}
              <span className="font-semibold">{user?.name || "User"}</span> 👋
            </span>
            <Avatar
              src={user?.avatar || user?.avatarUrl}
              alt={user?.name || "User"}
            />
          </button>

          {openUser && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-600 bg-white/95 dark:bg-zinc-800 backdrop-blur shadow-lg p-2">
              <ul className="space-y-1">
                <li>
                  <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm dark:text-zinc-200">
                    <User className="h-4 w-4" /> Hồ sơ
                  </button>
                </li>
                <li>
                  <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm dark:text-zinc-200">
                    <Settings className="h-4 w-4" /> Cài đặt
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm dark:text-zinc-200"
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
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm text-rose-600"
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
