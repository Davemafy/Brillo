import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const defaultTheme = {
    current: "light",
    themes: {
      light: { style: "bg-white text-black" },
      dark: { style: "bg-[#1c1d21] text-white darkmode" },
      system: { style: "bg-white text-black" },
    },
  };

  const themeHook = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={themeHook}>{children}</ThemeContext.Provider>
  );
};
