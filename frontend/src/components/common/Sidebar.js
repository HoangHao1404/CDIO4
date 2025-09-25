// Sidebar.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const HIGHLIGHT_H = 44; // px
const TRANS_DUR = 300; // ms

const MENU = [
  {
    key: "Dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: require("../../image/overview.png"),
  },
  {
    key: "AirQuality",
    label: "Chỉ số không khí",
    path: "/air-quality",
    icon: require("../../image/Chisokk.png"),
  },
  {
    key: "SafeThreshold",
    label: "Ngưỡng an toàn",
    path: "/threshold",
    icon: require("../../image/NguongAnToan.png"),
  },
  {
    key: "History",
    label: "Lịch sử",
    path: "/history",
    icon: require("../../image/LichSu.png"),
  },
  {
    key: "Settings",
    label: "Cài đặt",
    path: "/settings",
    icon: require("../../image/CaiDat.png"),
  },
];

export default function Sidebar() {
  const { theme } = useTheme();
  const location = useLocation();

  // activeIndex dựa theo pathname hiện tại
  const activeIndex = Math.max(
    0,
    MENU.findIndex((m) => location.pathname.startsWith(m.path))
  );

  const navRef = useRef(null);
  const [anchorTops, setAnchorTops] = useState([]);

  // đo vị trí các link để đặt highlight
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav) return setAnchorTops([]);
      const links = Array.from(nav.querySelectorAll("a"));
      setAnchorTops(links.map((a) => nav.offsetTop + a.offsetTop));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // đồng bộ khi theme class thay đổi
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const nav = navRef.current;
      if (!nav) return;
      const links = Array.from(nav.querySelectorAll("a"));
      setAnchorTops(links.map((a) => nav.offsetTop + a.offsetTop));
    });
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="fixed left-[-10px] top-0 h-screen w-[250px] flex items-start justify-start p-7 z-30">
      <div className="relative">
        <aside
          className={`w-[216px] h-[755px] rounded-[25px] shadow relative flex flex-col transition-colors duration-300
          ${
            theme === "light"
              ? "bg-white text-black"
              : "bg-zinc-900 text-zinc-200"
          }`}
        >
          {/* Logo */}
          <div className="absolute left-[63px] top-[36px]">
            <h1 className="font-['Inter'] font-semibold text-[32px] text-black dark:text-white">
              <span>Air</span>
              <span className="italic text-[#969696] dark:text-zinc-400">
                Zen
              </span>
            </h1>
          </div>

          {/* Active highlight */}
          <div
            className={`absolute left-[13px] w-[189px] h-[44px] rounded-[14px]
              ${theme === "light" ? "bg-[#ccf067]" : "bg-emerald-500/25"}`}
            style={{
              transition: `all ${TRANS_DUR}ms ease`,
              boxShadow:
                theme === "light"
                  ? "1px 5px 18px rgba(0,0,0,0.06)"
                  : "0 6px 18px rgba(16,24,32,0.6)",
              top: anchorTops.length
                ? `${
                    anchorTops[activeIndex] -
                    (HIGHLIGHT_H -
                      (navRef.current?.querySelector("a")?.offsetHeight ||
                        24)) /
                      2
                  }px`
                : undefined,
              backdropFilter: theme === "dark" ? "blur(4px)" : undefined,
            }}
          />

          {/* Menu */}
          <nav
            ref={navRef}
            className="absolute left-[32px] top-[115px] w-[161px] flex flex-col gap-[45px]"
          >
            {MENU.map((item, idx) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 relative z-10 select-none transition-all duration-200
                  ${isActive ? "" : "hover:translate-x-1"}`
                }
                end={item.path === "/dashboard"} // tránh /dashboard active khi ở /dashboard/...
                style={{ padding: "8px 4px", minHeight: `${HIGHLIGHT_H}px` }}
              >
                <div className="flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`w-5 h-5 transition-all duration-200 ${
                      theme === "dark"
                        ? "opacity-80 filter grayscale"
                        : "opacity-100"
                    }`}
                  />
                </div>
                <span
                  className={`font-['Inter'] text-[16px] leading-[20px] ${
                    idx === activeIndex
                      ? theme === "light"
                        ? "font-semibold text-emerald-800"
                        : "font-semibold text-emerald-100"
                      : theme === "light"
                      ? "text-zinc-600"
                      : "text-zinc-300"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <button className="absolute bottom-[27px] left-[63px] flex items-center gap-1">
            <img
              src={require("../../image/Logout.png")}
              alt="Logout"
              className="w-5 h-5"
            />
            <span className="font-['Inter'] text-[16px] text-[#969696] dark:text-zinc-400 ml-1">
              Log Out
            </span>
          </button>
        </aside>
      </div>
    </div>
  );
}
