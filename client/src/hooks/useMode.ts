import { useContext } from "react";
import { ModeContext } from "../context/context";

// hook to use the valeus of the context
export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("No context provided");
  }

  return context;
};
