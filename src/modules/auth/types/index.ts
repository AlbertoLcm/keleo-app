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
  WAITER = 'waiter',
  MANAGER = 'manager',
  CASHIER = 'cashier',
  KITCHEN = 'kitchen',
  OWNER = 'owner',
}

export interface User {
  id: string
  name: string,
  lastname: string,
  email: string,
  profile_image?: string,
  created_at: Date
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  userSet: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  verifyEmail: (token: string) => Promise<void>;
}