export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isTokenValid: (token: string) => boolean;
  isLoading: boolean;
}
