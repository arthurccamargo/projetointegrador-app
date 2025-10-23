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
import { isValidCPF } from "../../../../utils/validators/cpfValidator";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../../../../../theme/useTheme";
import Typography from "@mui/material/Typography";

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
  error?: string | null;
  success?: boolean;
  loading?: boolean;
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

function VolunteerPersonalTab({ defaultValues, onNext, onBack, error, success, loading }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(volunteerPersonalSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
  });
  const theme = useTheme();

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
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
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
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
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
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
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
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
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
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
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
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
              type={showPassword ? "text" : "password"}
              {...field}
              value={field.value}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
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
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
              type={showConfirmPassword ? "text" : "password"}
              {...field}
              value={field.value}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      edge="end"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {error && (
          <Typography
            color="error"
            sx={{ mb: 1, textAlign: "center", fontSize: "14px" }}
          >
            {error}
          </Typography>
        )}
        {success && (
          <Typography
            color="primary"
            sx={{ mb: 1, textAlign: "center", fontSize: "14px" }}
          >
            Cadastro realizado com sucesso!
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" onClick={onBack} disabled={loading}>
            Voltar
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              bgcolor: "theme.palette.primary.main",
              color: theme.palette.text.secondary,
            }}
          >
            {loading ? "Cadastrando..." : "Finalizar"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}

export default VolunteerPersonalTab;
