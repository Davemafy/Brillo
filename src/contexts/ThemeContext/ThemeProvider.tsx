import { useState, type PropsWithChildren } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const defaultTheme: ThemeType = {
    current: "light",
    themes: {
      light: { style: "bg-white text-black" },
      dark: { style: "bg-[#1c1d21] text-white darkmode" },
      system: { style: "bg-white text-black" },
    },
  };

  const themeHook = useState<ThemeType>(defaultTheme);

  return (
    <ThemeContext.Provider value={themeHook}>{children}</ThemeContext.Provider>
  );
};
