import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { httpClient } from "@/lib/api/http-client";
import type { AuthResponse, User, JwtPayload, RegisterRequest } from "../types";
import { toast } from "sonner";
import { DEFAULT_REDIRECT, ROLE_REDIRECTS } from "../utils/redirect";
import type { NavigateFunction } from "react-router-dom";

export const TOKEN_COOKIE_NAME = "babbler_auth_token";
export const TOKEN_EXPIRY_DAYS = 7;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUserState = useCallback((userData: User) => {
    setUser(userData);
    setIsLoading(false);
  }, []);

  const getToken = useCallback(() => {
    return Cookies.get(TOKEN_COOKIE_NAME);
  }, []);

  const setToken = useCallback((token: string) => {
    Cookies.set(TOKEN_COOKIE_NAME, token, {
      expires: TOKEN_EXPIRY_DAYS,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
    });
  }, []);

  const removeToken = useCallback(() => {
    Cookies.remove(TOKEN_COOKIE_NAME);
  }, []);

  const isAuthenticated = useCallback(() => {
    const token = getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return !(decoded.exp && decoded.exp * 1000 < Date.now());
    } catch {
      return false;
    }
  }, [getToken]);

  const loadUserFromToken = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const userData = await httpClient.get<User>("/auth/me");
      setUser(userData);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load user data:", error);
      removeToken();
      setUser(null);
      setIsLoading(false);
    }
  }, [getToken, removeToken]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      setIsLoading(true);

      try {
        const response = await httpClient.post<AuthResponse>("/auth/login", {
          email,
          password,
        });
        setToken(response.token);
        await loadUserFromToken();
        return response;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [setToken, loadUserFromToken],
  );

  const register = useCallback(
    async (userData: RegisterRequest): Promise<AuthResponse> => {
      setIsLoading(true);

      try {
        const response = await httpClient.post<AuthResponse>(
          "/auth/register",
          userData,
        );
        setToken(response.token);
        await loadUserFromToken();
        return response;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [setToken, loadUserFromToken],
  );

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    toast.success("Déconnexion réussie");
  }, [removeToken]);

  const handleRedirectAfterAuth = useCallback(
    (
      navigate: NavigateFunction,
      userRole?: string,
      fromPath?: string | null,
    ) => {
      // If user was redirected from a protected route, go back there
      if (fromPath) {
        navigate(fromPath);
        return;
      }

      // Otherwise redirect based on user role
      const normalizedRole = userRole?.toLowerCase() || "";
      const redirectPath = ROLE_REDIRECTS[normalizedRole] || DEFAULT_REDIRECT;
      navigate(redirectPath);
    },
    [],
  );

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  return {
    user,
    isLoading,
    isAuthenticated: isAuthenticated(),
    login,
    register,
    logout,
    getToken,
    handleRedirectAfterAuth,
    updateUserState,
  };
}
