import { z } from "zod";

// Schemas para validação por etapa)
export const volunteerPersonalSchema = z.object({
  fullName: z.string().min(3, "Nome obrigatório").nonempty("Nome obrigatório"),
  cpf: z.string().min(11, "CPF obrigatório").nonempty("CPF obrigatório"),
  birthDate: z.string().optional(),
  email: z.string().email("E-mail inválido").nonempty("E-mail obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").nonempty("Senha obrigatória"),
  phone: z.string().optional(),
});

export const volunteerAddressSchema = z.object({
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  experiences: z.string().optional(),
});
