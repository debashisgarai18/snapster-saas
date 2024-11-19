import { useState } from "react";
import { ModeContext } from "../context/context";

// this is a wrapper function which will be used around all the components which will be using the mode context
export default function ModeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setDark] = useState<boolean>(
    () => localStorage.getItem("isDark") === "true"
  );

  const toggleMode = () => {
    setDark((prev) => {
      const newMode = !prev;
      localStorage.setItem("isDark", String(newMode));
      return newMode;
    });
  };

  return (
    <ModeContext.Provider value={{ isDark, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}
