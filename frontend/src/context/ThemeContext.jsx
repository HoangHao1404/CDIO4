import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Tạo Context
const ThemeContext = createContext();

// 2. Tạo Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Lưu theme vào localStorage + update class HTML
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Hook để dùng ở Navbar, Sidebar
export const useTheme = () => useContext(ThemeContext);
// Giờ có thể dùng useTheme() trong Navbar, Sidebar để lấy theme và toggleTheme();