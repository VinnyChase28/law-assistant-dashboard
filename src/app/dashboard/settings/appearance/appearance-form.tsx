"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">Select Theme</div>
      <div className="flex gap-4">
        <div
          className={`cursor-pointer rounded border-2 p-2 ${
            theme === "light" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => handleThemeChange("light")}
        >
          <div className="flex items-center space-x-2">
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <span>Light</span>
          </div>
        </div>
        <div
          className={`cursor-pointer rounded border-2 p-2 ${
            theme === "dark" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => handleThemeChange("dark")}
        >
          <div className="flex items-center space-x-2">
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span>Dark</span>
          </div>
        </div>
      </div>
    </div>
  );
}
