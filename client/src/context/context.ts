import { createContext } from "react";

export interface mode {
  isDark: boolean;
  toggleMode : () => void
}

export const ModeContext = createContext<mode | undefined>(undefined);
