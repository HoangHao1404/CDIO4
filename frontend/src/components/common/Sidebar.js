import React from "react";
import icdashboard from "../../image/ic_dashboard.png";

// Update other image imports as well
import icAirQuality from "../../image/ic_chisokk.png";
import icThreshold from "../../image/ic_threshold.png";
import icHistory from "../../image/ic_history.png";
import icSettings from "../../image/ic_setting.png";
import icLogout from "../../image/ic_logout.png";

const Sidebar = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-7 bg-center bg-cover antialiased font-sans bg-gray-100">
      <div className="relative">
        <aside className="bg-white w-[216px] h-[80vh] max-h-[755px] min-h-[755px] rounded-[27px] shadow-[1px_5px_18px_rgba(0,0,0,0.1)] relative flex flex-col">
          {/* Logo AirZen */}
          <div className="absolute left-[63px] top-[36px] w-[105px] h-[40px]">
            <h1 className="font-['Inter'] font-semibold text-[32px] leading-[40px] text-black">
              <span>Air</span>
              <span className="italic text-[#969696]">Zen</span>
            </h1>
          </div>

          {/* Active Navigation Background */}
          <div className="absolute left-[13px] top-[106px] w-[189px] h-[44px] bg-[#ccf067] rounded-[30px]" />

          {/* Navigation Menu */}
          <nav className="absolute left-[32px] top-[115px] w-[161px] flex flex-col gap-[45px]">
            {/* Dashboard */}
            <a href="#" className="flex items-center gap-2 h-6 relative z-10">
              <img
                src={icdashboard}
                alt="Overview"
                className="icon-fix brightness-0"
                style={{ width: "18px", height: "18px" }}
                onError={(e) => {
                  e.currentTarget.style.backgroundColor = "#666";
                }}
              />
              <span className="font-['Inter'] font-normal text-[16px] leading-[20px] text-black">
                Dashboard
              </span>
            </a>

            {/* Chỉ số không khí */}
            <a href="#" className="flex items-center gap-2 h-6">
              <img
                src={icAirQuality}
                alt="Users"
                className="icon-fix brightness-0"
                style={{ width: "18px", height: "18px" }}
                onError={(e) => {
                  e.currentTarget.style.backgroundColor = "#666";
                }}
              />
              <span className="font-['Inter'] font-normal text-[16px] leading-[20px] text-[#969696]">
                Chỉ số không khí
              </span>
            </a>

            {/* Ngưỡng an toàn */}
            <a href="#" className="flex items-center gap-2 h-6">
              <img
                src={icThreshold}
                alt="Support"
                className="icon-fix brightness-0"
                style={{ width: "18px", height: "18px" }}
                onError={(e) => {
                  e.currentTarget.style.backgroundColor = "#666";
                }}
              />
              <span className="font-['Inter'] font-normal text-[16px] leading-[20px] text-[#969696]">
                Ngưỡng an toàn
              </span>
            </a>

            {/* Lịch sử */}
            <a href="#" className="flex items-center gap-2 h-6">
              <img
                src={icHistory}
                alt="Notifications"
                className="icon-fix brightness-0"
                style={{ width: "18px", height: "18px" }}
                onError={(e) => {
                  e.currentTarget.style.backgroundColor = "#666";
                }}
              />
              <span className="font-['Inter'] font-normal text-[16px] leading-[20px] text-[#969696]">
                Lịch sử
              </span>
            </a>

            {/* Cài đặt */}
            <a href="#" className="flex items-center gap-2 h-6">
              <img
                src={icSettings}
                alt="Settings"
                className="icon-fix brightness-0"
                style={{ width: "18px", height: "18px" }}
                onError={(e) => {
                  e.currentTarget.style.backgroundColor = "#666";
                }}
              />
              <span className="font-['Inter'] font-normal text-[16px] leading-[20px] text-[#969696]">
                Cài đặt
              </span>
            </a>
          </nav>

          {/* Logout */}
          <button className="absolute bottom-[27px] left-[63px] flex items-center gap-1">
            <img src={icLogout} alt="Logout" className="w-5 h-5 brightness-0" />
            <span className="font-['Inter'] font-normal text-[16px] leading-[20px] text-[#969696] ml-1">
              Log Out
            </span>
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
