import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const menuItems = [
  {
    key: "Overview",
    label: "Overview",
    icon: require("../../image/overview.png"),
    path: "/admin/overview",
  },
  {
    key: "QuanLyUser",
    label: "Quản lý user",
    icon: require("../../image/ic_user.png"),
    path: "/admin/users",
  },
  {
    key: "QuanLyThietBi",
    label: "Quản lý thiết bị",
    icon: require("../../image/ic_threshold.png"),
    path: "/admin/devices",
  },
  {
    key: "YCHT",
    label: "Yêu cầu hỗ trợ",
    icon: require("../../image/ic_ycht.png"),
    path: "/admin/request",
  },
  {
    key: "ThongBao",
    label: "Quản lý thông báo",
    icon: require("../../image/ic_thongbao.png"),
    path: "/admin/notification",
  }, 
  {
    key: "CaiDat",
    label: "Cài đặt",
    icon: require("../../image/CaiDat.png"),
    path: "/admin/setting",
  }, 
];

const HIGHLIGHT_H = 44;
const TRANS_DUR = 300;

const SidebarAdmin = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorTops, setAnchorTops] = useState([]);

  // Cập nhật activeIndex theo route
  useEffect(() => {
    const index = menuItems.findIndex((item) => {
      if (item.path === "/") return location.pathname === "/";
      return location.pathname.startsWith(item.path);
    });
    if (index !== -1) setActiveIndex(index);
  }, [location]);

  // Đo vị trí chính xác
  useEffect(() => {
    const measure = () => {
      if (!navRef.current) return;
      const navTop = navRef.current.offsetTop;
      const links = Array.from(navRef.current.querySelectorAll("a"));
      setAnchorTops(links.map((el) => navTop + el.offsetTop));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const highlightTop =
    anchorTops.length && activeIndex < anchorTops.length
      ? anchorTops[activeIndex]
      : undefined;

  return (
    <div className="fixed left-[-10px] top-0 h-screen w-[250px] flex items-start justify-start p-7 z-30">
      <div className="relative">
        <aside
          className={`w-[216px] h-[700px] rounded-[25px] shadow relative flex flex-col transition-colors duration-300
          ${theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-zinc-200"}`}
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
          {highlightTop !== undefined && (
            <div
              className={`absolute left-[13px] w-[189px] h-[44px] rounded-[14px]
                ${theme === "light" ? "bg-[#ccf067]" : "bg-emerald-500/25"}`}
              style={{
                top: `${highlightTop}px`,
                transition: `top ${TRANS_DUR}ms ease`,
                boxShadow:
                  theme === "light"
                    ? "1px 5px 18px rgba(0,0,0,0.06)"
                    : "0 6px 18px rgba(16,24,32,0.6)",
              }}
            />
          )}

          {/* Menu */}
          <nav
            ref={navRef}
            className="absolute left-[32px] top-[115px] w-[161px] flex flex-col gap-[45px]"
          >
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 relative z-10 select-none transition-all duration-200 ${
                    isActive
                      ? "text-emerald-700 dark:text-emerald-200"
                      : "text-gray-500"
                  }`
                }
                style={{ padding: "8px 4px", minHeight: `${HIGHLIGHT_H}px` }}
              >
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span className="font-['Inter'] text-[16px] leading-[20px]">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default SidebarAdmin;
