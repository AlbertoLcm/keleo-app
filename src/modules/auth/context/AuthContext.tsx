// authContext.tsx
import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { AuthContextType, User } from "../types";
import api from '@/api/axios';
import { ROUTES } from '@/routes/paths';
import { useNavigate } from 'react-router';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    if (accessToken && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    response => response,
    error => {
      const status = error.response?.status;
      if (status === 401) {
        console.warn("⚠️ Token expirado o inválido, cerrando sesión...");
        logout();
      }
      return Promise.reject(error);
    }
  );

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { accessToken, user } = res.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
