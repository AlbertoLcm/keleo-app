import type { UUID } from "crypto";

export interface SigninData {
  email: string,
  password: string
}

export interface SignupData {
  name: string,
  lastname: string,
  email: string,
  password: string
}

export enum Role {
  ADMIN = 'admin',
  MESERO = 'mesero',
  GERENTE = 'gerente',
  CAJERO = 'cajero',
  COCINERO = 'cocinero',
}

export interface User {
  id: UUID
  name: string,
  lastname: string,
  email: string,
  role: Role,
  created_at: Date
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}