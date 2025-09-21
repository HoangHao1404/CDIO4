import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
// 👉 Bổ sung import useNavigate + useLocation
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate(); // 👉 Bổ sung
  const location = useLocation(); // 👉 Bổ sung

  const menuItems = [
    {
      key: "Dashboard",
      label: "Dashboard",
      icon: require("../../image/overview.png"),
      path: "/dashboard", // 👉 Bổ sung field path
    },
    {
      key: "AirQuality",
      label: "Chỉ số không khí",
      icon: require("../../image/Chisokk.png"),
      path: "/air-quality",
    },
    {
      key: "SafeThreshold",
      label: "Ngưỡng an toàn",
      icon: require("../../image/NguongAnToan.png"),
      path: "/safe-threshold",
    },
    {
      key: "History",
      label: "Lịch sử",
      icon: require("../../image/LichSu.png"),
      path: "/history",
    },
    {
      key: "Settings",
      label: "Cài đặt",
      icon: require("../../image/CaiDat.png"),
      path: "/settings",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // 👉 Bổ sung: Tự động set active theo URL hiện tại
  useEffect(() => {
    const idx = menuItems.findIndex((m) =>
      location.pathname.startsWith(m.path)
    );
    if (idx >= 0) setActiveIndex(idx);
  }, [location.pathname]);

  const navRef = useRef(null);
  const [anchorTops, setAnchorTops] = useState([]);
  const HIGHLIGHT_H = 44;
  const TRANS_DUR = 300;

  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav) return setAnchorTops([]);
      const anchors = Array.from(nav.querySelectorAll("button")); // 👉 Đổi a -> button
      const tops = anchors.map((a) => nav.offsetTop + a.offsetTop);
      setAnchorTops(tops);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [menuItems.length]);

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

          {/* Highlight */}
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
                      (navRef.current?.querySelector("button")?.offsetHeight ||
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
            {menuItems.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  navigate(item.path); // 👉 Bổ sung: điều hướng route
                }}
                className={`flex items-center gap-3 relative z-10 select-none transition-all duration-200 ${
                  activeIndex === index ? "" : "hover:translate-x-1"
                }`}
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
                    activeIndex === index
                      ? `${
                          theme === "light"
                            ? "font-semibold text-emerald-800"
                            : "font-semibold text-emerald-100"
                        }`
                      : `${
                          theme === "light" ? "text-zinc-600" : "text-zinc-300"
                        }`
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Logout */}
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
};

export default Sidebar;
