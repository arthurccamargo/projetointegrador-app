import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ongDataSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  cnpj: z.string().min(14, "CNPJ obrigatório"),
  description: z.string().optional(),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "Senha obrigatória"),
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
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Descrição"
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
              type="password"
              {...field}
              value={field.value}
              error={!!errors.password}
              helperText={errors.password?.message}
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

export default OngDataTab;
