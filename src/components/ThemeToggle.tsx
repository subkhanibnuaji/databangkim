"use client";

import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-ring"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Mode terang" : "Mode gelap"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-accent-400" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
    </button>
  );
}
