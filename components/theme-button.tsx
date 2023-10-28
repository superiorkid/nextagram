"use client";

import React, { useCallback } from "react";
import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";
import { MdSunny } from "react-icons/md";

function ThemeButton() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme, theme]);

  return (
    <button
      className="text-base text-left font-light hover:bg-gray-100 py-2.5 px-3 rounded-md w-full focus:outline-none dark:hover:bg-gray-700 transition-all duration-1000 capitalize"
      onClick={handleThemeChange}
    >
      {theme === "light" ? (
        <MdSunny className="h-5 w-5 inline mr-3" />
      ) : (
        <FaRegMoon className="h-5 w-5 inline mr-3" />
      )}{" "}
      {theme}
    </button>
  );
}

export default ThemeButton;
