"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, type RegisterInput } from "@/lib/api";

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};path=/;expires=${d.toUTCString()};SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

interface AuthContextType {
  token: string | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    haveCompany: boolean,
    companyData?: { organizationName?: string; websiteURL?: string; industry?: string; teamSize?: number }
  ) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    if (match) setToken(match[1]);
    setIsReady(true);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.login({ email, password });
      setCookie("token", res.access_token, 7);
      setCookie("refresh_token", res.refresh_token, 30);
      setToken(res.access_token);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (
      email: string,
      password: string,
      haveCompany: boolean,
      companyData?: { organizationName?: string; websiteURL?: string; industry?: string; teamSize?: number }
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.register({
          email,
          password,
          ...(haveCompany && companyData
            ? {
                company: Object.fromEntries(
                  Object.entries(companyData).filter(([, v]) => v !== undefined && v !== "")
                ) as RegisterInput["company"],
              }
            : {}),
        });
        setCookie("token", res.access_token, 7);
        setCookie("refresh_token", res.refresh_token, 30);
        setToken(res.access_token);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    const refreshToken = document.cookie.match(/(?:^|;\s*)refresh_token=([^;]*)/)?.[1] ?? null;
    try {
      if (refreshToken) await api.logout(refreshToken);
    } catch {
      // ignore logout errors
    }
    deleteCookie("token");
    deleteCookie("refresh_token");
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isReady,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        error,
        clearError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
