import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./auth.type";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
