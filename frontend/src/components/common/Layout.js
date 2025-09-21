import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const SIDEBAR_W = 230; // px -> đúng theo Figma
const NAVBAR_H = 70; // px -> chiều cao navbar theo Figma
const CONTAINER_W = 1385; // px -> max-width container theo Figma

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - fixed bên trái */}
      <Sidebar />

      {/* Navbar - fixed top, container căn giữa */}
      <div
        className="fixed top-0 z-40 w-full"
        style={{
          marginLeft: `${SIDEBAR_W}px`,
          height: `${NAVBAR_H}px`,
        }}
      >
        <div className="max-w-[1385px] mx-auto px-4">
          <Navbar />
        </div>
      </div>
      <main
        className="transition-colors duration-300"
        style={{
          marginLeft: `${SIDEBAR_W}px`,
          paddingTop: `${NAVBAR_H + 40}px`, // cách navbar ~40px
          paddingBottom: "40px", // thêm khoảng dưới
        }}
      >
        <div className="max-w-[1385px] mx-auto px-8">
          {/* Content Wrapper */}
          <div className="bg-white rounded-3xl shadow-lg  min-h-[calc(107vh-200px)]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
