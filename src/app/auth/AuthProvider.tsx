import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, User } from "./auth.types";

const BASEAPI_URL = import.meta.env.VITE_BASEAPI_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    const savedUser = sessionStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${BASEAPI_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();

    setToken(data.access_token);
    setUser(data.user);

    sessionStorage.setItem("token", data.access_token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
  }

  function logout() {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }

  const value: AuthContextType = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
