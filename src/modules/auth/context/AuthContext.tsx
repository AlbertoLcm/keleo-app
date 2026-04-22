import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, User } from "../types";
import api from "@/api/axios";
import { ROUTES } from "@/routes/paths";
import { useNavigate } from "react-router";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        if (window.location.pathname !== ROUTES.LOGIN) {
          handleCleanup();
          navigate(ROUTES.LOGIN);
        }
      }
      return Promise.reject(error);
    }
  );

  const handleCleanup = () => {
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    navigate(ROUTES.RESTAURANTS.INDEX);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      handleCleanup();
      navigate(ROUTES.LOGIN);
    }
  };

  const userSet = (user: User) => {
    setUser(user);
  };

  const verifyEmail = async (token: string) => {
    const res = await api.post(`/auth/verify-email`, { token });
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        userSet,
        verifyEmail,
        isLoggedIn: !!user,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};