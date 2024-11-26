import { createContext } from "react";

export interface mode {
  isDark: boolean;
  toggleMode: () => void;
}

export interface auth {
  isSignedin: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface loading {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModeContext = createContext<mode | undefined>(undefined);
export const AuthContext = createContext<auth | undefined>(undefined);
export const LoadingContext = createContext<loading | undefined>(undefined);

// todo: after creating the backend-> create a context to get the value of the use after sign in
