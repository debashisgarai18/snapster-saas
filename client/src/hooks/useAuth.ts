import { useContext } from "react";
import { AuthContext } from "../context/context";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("No context Provided");

  return context;
}
