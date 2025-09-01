import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { volunteerPersonalSchema } from "../../validation/volunteerSchemas";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type FormData = z.infer<typeof volunteerPersonalSchema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

function VolunteerPersonalTab({ defaultValues, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(volunteerPersonalSchema),
    defaultValues,
  });

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
              type="password"
              {...field}
              error={!!errors.password}
              helperText={errors.password?.message}
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
              {...field}
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
            Próximo
          </Button>
        </Box>
      </Stack>
    </form>
  );
}

export default VolunteerPersonalTab;
