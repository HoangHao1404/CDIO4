import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Cloud,
  Loader2,
  LogOut,
  Moon,
  Settings,
  User,
  Sun,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
// Mock auth
const useAuth = () => ({
  user: {
    name: "Cà phê",
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=256&auto=format&fit=crop",
  },
});

const formatDate = (d) =>
  d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

async function fetchWeather(lat, lon) {
  const apiKey =
    (typeof process !== "undefined" &&
      process.env.REACT_APP_OPENWEATHER_API_KEY) ||
    (typeof window !== "undefined" && window.REACT_APP_OPENWEATHER_API_KEY);

  if (!apiKey) {
    return {
      city: "Da Nang",
      tempC: 26,
      description: "Mây rải rác",
      icon: "04d",
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=vi&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  const json = await res.json();
  return {
    city: json.name || "",
    tempC: Math.round(json.main?.temp ?? 0),
    description: json.weather?.[0]?.description ?? "",
    icon: json.weather?.[0]?.icon ?? "01d",
  };
}

function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoading(true);
      setErr(null);
      try {
        const getByGeo = () =>
          new Promise((resolve) => {
            if (!navigator.geolocation) return resolve(null);
            navigator.geolocation.getCurrentPosition(
              (p) => resolve(p),
              () => resolve(null),
              { enableHighAccuracy: false, timeout: 5000 }
            );
          });

        const geo = await getByGeo();
        let w = null;
        if (geo) {
          w = await fetchWeather(geo.coords.latitude, geo.coords.longitude);
        } else {
          w = await fetchWeather(16.0678, 108.2208); // Đà Nẵng
        }
        if (mounted) setData(w);
      } catch (e) {
        if (mounted) setErr(e?.message || "Weather error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    const id = setInterval(run, 10 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return { data, loading, err };
}

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useClickOutside(onOutside) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onOutside();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside]);
  return ref;
}

const BadgeDot = ({ className = "" }) => (
  <span className={`inline-block h-2 w-2 rounded-full ${className}`} />
);

const NotificationDropdown = ({ items, onMarkAllRead }) => (
  <div
    className="w-80 rounded-2xl border border-zinc-200 dark:border-zinc-600 
                  bg-white/90 dark:bg-zinc-800/95 backdrop-blur shadow-lg p-2"
  >
    <div className="flex items-center justify-between px-2 py-1">
      <p className="text-sm font-semibold dark:text-white">Thông báo</p>
      <button
        onClick={onMarkAllRead}
        className="text-xs rounded-full px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-zinc-300"
      >
        Đánh dấu đã đọc
      </button>
    </div>
    <div className="max-h-80 overflow-auto pr-1">
      {items.length === 0 ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 px-3 py-6 text-center">
          Không có thông báo
        </p>
      ) : (
        <ul className="space-y-1">
          {items.map((n) => (
            <li
              key={n.id}
              className={`flex gap-3 rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 ${
                n.unread ? "bg-zinc-50 dark:bg-zinc-700" : ""
              }`}
            >
              <div className="pt-1">
                <BadgeDot
                  className={
                    n.severity === "critical"
                      ? "bg-rose-500"
                      : n.severity === "warning"
                      ? "bg-amber-500"
                      : "bg-sky-500"
                  }
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
);

const Avatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5"
    onError={(e) => (e.target.style.display = "none")}
  />
);

export default function NavbarAirZen() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const now = useNow();
  const { data: weather, loading: wLoading } = useWeather();

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
  const unreadCount = useMemo(
    () => noti.filter((n) => n.unread).length,
    [noti]
  );

  const [openNoti, setOpenNoti] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const notiRef = useClickOutside(() => setOpenNoti(false));
  const userRef = useClickOutside(() => setOpenUser(false));

  const markAllRead = () =>
    setNoti((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <header className="w-full sticky top-0 z-40">
      <div className="mx-auto mt-2 rounded-3xl bg-white/90 dark:bg-zinc-800 shadow px-2 py-2">
        <div className="flex items-center justify-end gap-3">
          {/* Weather */}
          <div
            className="hidden sm:flex items-center gap-2 rounded-full 
                          bg-zinc-100/90 dark:bg-zinc-700 
                          text-zinc-700 dark:text-zinc-200 
                          px-4 py-2 shadow-inner"
          >
            <Cloud className="h-4 w-4 opacity-70" />
            {wLoading ? (
              <span className="flex items-center gap-1 text-sm">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tải
              </span>
            ) : (
              <span className="text-sm">{weather?.tempC ?? "--"}°C</span>
            )}
            <span className="text-zinc-400">|</span>
            <span className="text-sm">{formatDate(now)}</span>
          </div>

          {/* Notification button */}
          <div ref={notiRef} className="relative">
            <button
              onClick={() => setOpenNoti((v) => !v)}
              className="relative h-10 w-10 rounded-full 
                         bg-white dark:bg-zinc-700 
                         border border-zinc-200 dark:border-zinc-600 
                         shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600"
              aria-label="Mở thông báo"
            >
              <Bell className="mx-auto h-5 w-5 text-zinc-800 dark:text-zinc-200" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>
            {openNoti && (
              <div className="absolute right-0 mt-2">
                <NotificationDropdown
                  items={noti}
                  onMarkAllRead={markAllRead}
                />
              </div>
            )}
          </div>

          {/* User button */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setOpenUser((v) => !v)}
              className="group flex items-center gap-3 
                         rounded-full 
                         bg-amber-50 dark:bg-zinc-700 
                         px-4 py-2 shadow-sm 
                         hover:bg-amber-100 dark:hover:bg-zinc-600"
            >
              <span className="text-sm text-zinc-800 dark:text-zinc-200">
                Xin chào, <span className="font-semibold">{user.name}</span> 👋
              </span>
              <Avatar src={user.avatarUrl} alt={user.name} />
            </button>

            {openUser && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl 
                              border border-zinc-200 dark:border-zinc-600 
                              bg-white/95 dark:bg-zinc-800 
                              backdrop-blur shadow-lg p-2"
              >
                <div className="px-2 pb-2 pt-1">
                  <p className="text-sm font-semibold dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Người dùng AirZen
                  </p>
                </div>
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
      </div>
    </header>
  );
}
