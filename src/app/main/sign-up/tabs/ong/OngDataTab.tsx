import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { isValidCNPJ } from "../../../../utils/validators/cnpjValidator";
import { CnpjMaskInput } from "../../../../shared-components/mask/CnpjMask";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ongDataSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório").nonempty("Nome obrigatório"),
    cnpj: z
      .string()
      .min(18, "CNPJ deve ter 18 caracteres")
      .nonempty("Digite o CNPJ")
      .refine(isValidCNPJ, "CNPJ inválido"),
    description: z.string().optional(),
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

type FormData = z.infer<typeof ongDataSchema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

const defaultFormValues: FormData = {
  name: "",
  cnpj: "",
  description: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function OngDataTab({ defaultValues, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ongDataSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nome da ONG"
              {...field}
              value={field.value}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="cnpj"
          control={control}
          render={({ field }) => (
            <TextField
              label="CNPJ"
              {...field}
              value={field.value}
              error={!!errors.cnpj}
              helperText={errors.cnpj?.message}
              fullWidth
              InputProps={{
                inputComponent: CnpjMaskInput as any,
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 18,
              }}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Descrição (opcional)"
              multiline
              rows={3}
              {...field}
              value={field.value}
              error={!!errors.description}
              helperText={errors.description?.message}
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

export default OngDataTab;
