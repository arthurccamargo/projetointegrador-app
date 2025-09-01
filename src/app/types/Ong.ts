export interface Ong {
  cnpj: string;
  name: string;
  description?: string;
  email: string;
  password: string;
  cep: string;
  street: string;
  number: string;
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
