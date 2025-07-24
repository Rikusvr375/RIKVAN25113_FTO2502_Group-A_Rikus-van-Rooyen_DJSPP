import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "dark";
    console.log("Initial theme from localStorage:", initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    const body = document.body;
    if (body) {
      console.log("Applying theme:", theme);
      body.classList.remove("dark", "light");
      body.classList.add(theme);
      localStorage.setItem("theme", theme);
      console.log("Body classes after update:", body.className);

      // Inline style fallback
      body.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#f5f5f5";
      body.style.color = theme === "dark" ? "#fff" : "#333";
    } else {
      console.error("document.body is not available");
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log("Toggling theme, current theme:", theme);
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      console.log("New theme:", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}