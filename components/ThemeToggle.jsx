"use client";

import { useTheme } from "@/context/ThemeContext";
import Switch from "react-switch";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <Switch
        onChange={toggleTheme}
        checked={theme === "neon"}
        offColor="#4A5568" // Dark mode color
        onColor="#39FF14" // Neon green color
        uncheckedIcon={<div style={{ padding: 2 }}>🌙</div>}
        checkedIcon={<div style={{ padding: 2 }}>🌞</div>}
      />
    </div>
  );
}