"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

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
    fullName: string,
    email: string,
    password: string,
    haveCompany: boolean,
    orgData?: { organizationName?: string; website?: string; industry?: string; teamSize?: number }
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
      fullName: string,
      email: string,
      password: string,
      haveCompany: boolean,
      orgData?: { organizationName?: string; website?: string; industry?: string; teamSize?: number }
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.register({
          fullName,
          email,
          password,
          haveCompany,
          ...orgData,
        });
        setCookie("token", res.access_token, 7);
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
    try {
      await api.logout();
    } catch {
      // ignore logout errors
    }
    deleteCookie("token");
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
