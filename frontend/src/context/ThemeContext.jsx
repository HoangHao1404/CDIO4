import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Lấy theme từ localStorage hoặc mặc định là light
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Cập nhật class dark và lưu vào localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#0f0f0f"; // 🆕 nền tối cho toàn trang
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#f9fafb"; // 🆕 nền sáng (tailwind bg-zinc-100)
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Hàm toggle theme
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => useContext(ThemeContext);
