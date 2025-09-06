import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { isValidCNPJ } from "../../../../utils/validators/cnpjValidator";
import { CnpjMaskInput } from "../../../../shared-components/mask/CnpjMask";

const ongDataSchema = z.object({
  name: z.string().min(1, "Nome obrigatório").nonempty("Nome obrigatório"),
  cnpj: z
    .string()
    .min(18, "CNPJ deve ter 18 caracteres")
    .nonempty("Digite o CNPJ")
    .refine(isValidCNPJ, "CNPJ inválido"),
  description: z.string().optional(),
  email: z.email("E-mail inválido").nonempty("E-mail obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").nonempty("Senha obrigatória"),
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
