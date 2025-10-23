export interface VolunteerProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  birthDate?: string | null;
  phone?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string | null;
  neighborhood?: string;
  city?: string;
  state?: string;
  experiences?: string | null;
}

export interface OngProfile {
  id: string;
  userId: string;
  email: string;
  password: string;
  cnpj: string;
  name: string;
  description?: string;
  cep: string;
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  responsibleName: string;
  responsibleCpf: string;
  responsibleEmail: string;
  documentUrl?: string;
  status?: string;
}

export interface User {
  id: string;
  email: string;
  role: "VOLUNTEER" | "ONG";
  status: "ACTIVE" | "PENDING";
  createdAt: string;
  updatedAt: string;
  volunteerProfile: VolunteerProfile | null;
  ongProfile: OngProfile | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  isTokenValid: (token: string) => boolean;
  isLoading: boolean;
}
