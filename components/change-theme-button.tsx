"use client";

import React, { useCallback } from "react";
import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";
import { MdSunny } from "react-icons/md";

function ChangeThemeButton() {
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
      className="text-base text-left font-light hover:bg-gray-100 py-2.5 px-3 rounded-md w-full focus:outline-none dark:hover:bg-gray-700"
      onClick={handleThemeChange}
    >
      {theme === "light" ? (
        <>
          <FaRegMoon className="w-5 h-5 inline mr-3" />
          Dark
        </>
      ) : (
        <>
          <MdSunny className="w-5 h-5 inline mr-3" />
          Light
        </>
      )}
    </button>
  );
}

export default ChangeThemeButton;
