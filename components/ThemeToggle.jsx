"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import { useApp } from "./Providers";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const dark = theme === "studiodark";
  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Light theme" : "Dark theme"}>
      {dark ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </button>
  );
}
