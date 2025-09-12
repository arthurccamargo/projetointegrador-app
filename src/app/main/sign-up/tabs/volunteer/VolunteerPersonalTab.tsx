import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { CPFMaskInput } from "../../../../shared-components/mask/CpfMask";
import { PhoneMaskInput } from "../../../../shared-components/mask/PhoneMask";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { isValidCPF } from "../../../../utils/validators/cpfValidator";

const volunteerPersonalSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Nome obrigatório")
      .nonempty("Nome obrigatório"),
    cpf: z
      .string()
      .min(14, "CPF deve ter 14 caracteres")
      .nonempty({ message: "Digite o CPF" })
      .refine(isValidCPF, "CPF inválido"),
    birthDate: z.string().optional(),
    phone: z
      .string()
      .min(14, "Telefone deve ter 14 caracteres")
      .refine(
        (value) =>
          value === "" ||
          /^\(\d{2}\)\s\d{5}-\d{4}$/.test(value) ||
          /^\(\d{2}\)\s\d{4}-\d{4}$/.test(value),
        "Telefone inválido"
      )
      .optional(),
    email: z.email("E-mail inválido").nonempty("E-mail obrigatório"),
    password: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .nonempty("Senha obrigatória"),
    confirmPassword: z.string().nonempty("Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof volunteerPersonalSchema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

const defaultFormValues: FormData = {
  fullName: "",
  cpf: "",
  birthDate: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function VolunteerPersonalTab({ defaultValues, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(volunteerPersonalSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <Stack spacing={2}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nome completo"
              placeholder="Seu nome"
              InputLabelProps={{ shrink: true, style: { color: '#A1A1A1' } }}
              {...field}
              value={field.value}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <TextField
              label="CPF"
              placeholder="000.000.000-00"
              {...field}
              InputLabelProps={{ shrink: true, style: { color: '#A1A1A1' } }}
              InputProps={{
                inputComponent: CPFMaskInput as any,
              }}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <TextField
              label="Data de nascimento"
              type="date"
              {...field}
              value={field.value}
              InputLabelProps={{ shrink: true, style: { color: '#A1A1A1' } }}
              error={!!errors.birthDate}
              helperText={errors.birthDate?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              label="Telefone"
              placeholder="(99) 99999-9999"
              {...field}
              InputLabelProps={{ shrink: true, style: { color: '#A1A1A1' } }}
              InputProps={{
                inputComponent: PhoneMaskInput as any,
              }}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="E-mail"
              placeholder="seu@email.com"
              InputLabelProps={{ shrink: true, style: { color: '#A1A1A1' } }}
              {...field}
              value={field.value}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="Senha"
              placeholder="Sua senha"
              InputLabelProps={{ shrink: true, style: { color: '#A1A1A1' } }}
              type={showPassword ? "text" : "password"}
              {...field}
              value={field.value}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Box
                    onClick={() => setShowPassword((prev) => !prev)}
                    sx={{ cursor: "pointer" }}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </Box>
                ),
              }}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              InputLabelProps={{ shrink: true, style: { color: '#A1A1A1' } }}
              type={showConfirmPassword ? "text" : "password"}
              {...field}
              value={field.value}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Box
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    sx={{ cursor: "pointer" }}
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </Box>
                ),
              }}
            />
          )}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" onClick={onBack}>
            Voltar
          </Button>
          <Button variant="contained" type="submit">
            Finalizar
          </Button>
        </Box>
      </Stack>
    </form>
  );
}

export default VolunteerPersonalTab;