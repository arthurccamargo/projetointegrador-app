import { z } from "zod";

export const ongDataSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  cnpj: z.string().min(14, "CNPJ obrigatório"),
  description: z.string().optional(),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "Senha obrigatória"),
});

export const ongAddressResponsibleSchema = z.object({
  cep: z.string().min(1, "CEP obrigatório"),
  street: z.string().min(1, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().min(1, "Estado obrigatório"),
  responsibleName: z.string().min(3, "Nome do responsável obrigatório"),
  responsibleCpf: z.string().min(11, "CPF do responsável obrigatório"),
  responsibleEmail: z.email("E-mail do responsável inválido"),
  documentUrl: z.string().optional(),
});
