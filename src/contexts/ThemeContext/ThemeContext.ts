import { createContext, type Dispatch, type SetStateAction } from "react";

type ThemeContextType = [ThemeType, Dispatch<SetStateAction<ThemeType>>]

export const ThemeContext = createContext<ThemeContextType | null>(null);

