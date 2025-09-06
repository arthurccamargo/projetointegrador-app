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
      .refine((value: string) => {
        const doc = value.replace(/\D/g, "");
        if (doc.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(doc)) return false;
        const cpfDigits = doc.split("").map(Number);
        const calcCheckDigit = (count: number): number => {
          const sum = cpfDigits
            .slice(0, count - 1)
            .reduce((acc, curr, index) => acc + curr * (count - index), 0);
          const rest = (sum * 10) % 11;
          return rest === 10 ? 0 : rest;
        };
        return (
          calcCheckDigit(10) === cpfDigits[9] &&
          calcCheckDigit(11) === cpfDigits[10]
        );
      }, "CPF inválido"),
    birthDate: z.string().optional(),
    email: z.email("E-mail inválido").nonempty("E-mail obrigatório"),
    password: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .nonempty("Senha obrigatória"),
    confirmPassword: z.string().nonempty("Confirme a senha"),
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
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
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
              {...field}
              InputProps={{
                inputComponent: CPFMaskInput,
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
              InputLabelProps={{ shrink: true }}
              error={!!errors.birthDate}
              helperText={errors.birthDate?.message}
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
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              label="Telefone"
              {...field}
              InputProps={{
                inputComponent: PhoneMaskInput,
              }}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
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