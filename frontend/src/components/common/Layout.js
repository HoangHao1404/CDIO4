import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavbarAirZen from "./Navbar";

const SIDEBAR_W = 230;
const NAVBAR_H = 70;

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Sidebar */}
      <Sidebar />

      {/* Phần chính */}
      <div className="flex-1 flex flex-col ml-[230px]">
        {/* Navbar (fixed, nằm trên content) */}
        <NavbarAirZen />

        {/* Nội dung */}
        <main
          className="flex-1 p-6 overflow-x-hidden"
          style={{ marginTop: `${NAVBAR_H + 20}px` }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
