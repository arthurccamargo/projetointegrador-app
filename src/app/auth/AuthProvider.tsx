import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, User } from "./auth.type";

const BASEAPI_URL = import.meta.env.VITE_BASE_API_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Para que o login seja reconhecido mesmo após recarregar a página
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    const savedUser = sessionStorage.getItem("user");

    if (savedToken && savedUser) {
      // Verifica se o token ainda é válido
      if (isTokenValid(savedToken)) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        sessionStorage.clear(); // limpa token expirado
      }
    }

    setIsLoading(false); // Marca como carregado
  }, []);

  async function signIn(email: string, password: string): Promise<User> {
    const res = await fetch(`${BASEAPI_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao fazer login");
    }

    const data = await res.json();

    setToken(data.access_token);
    setUser(data.user);

    sessionStorage.setItem("token", data.access_token);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  }

  function signOut() {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }

  function updateUser(updatedData: Partial<User>) {
    if (!user) return;

    // Mescla os dados atuais com os novos
    const updatedUser = {
      ...user,
      ...updatedData,
      // Se houver perfil atualizado, mescla também
      volunteerProfile: updatedData.volunteerProfile
        ? { ...user.volunteerProfile, ...updatedData.volunteerProfile }
        : user.volunteerProfile,
      ongProfile: updatedData.ongProfile
        ? { ...user.ongProfile, ...updatedData.ongProfile }
        : user.ongProfile,
    };

    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  }

  function isTokenValid(token: string): boolean {
    try {
      const [, payloadBase64] = token.split(".");
      const payload = JSON.parse(atob(payloadBase64));
      const exp = payload.exp * 1000; // exp vem em segundos, converter para ms
      return Date.now() < exp;
    } catch {
      return false;
    }
  }

  const value: AuthContextType = { 
    user, 
    token, 
    signIn, 
    signOut, 
    updateUser,
    isTokenValid, 
    isLoading 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
