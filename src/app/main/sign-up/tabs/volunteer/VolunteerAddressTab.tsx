import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { CepMaskInput } from "../../../../shared-components/mask/CepMask";

const volunteerAddressSchema = z.object({
  cep: z
    .string()
    .optional()
    .refine(
      (cep) => {
        if (!cep) return true;

        // Remove qualquer caractere não numérico (incluindo o hífen)
        const cleanedCEP = cep.replace(/\D/g, "");

        // Verifica se tem 8 dígitos
        if (cleanedCEP.length !== 8) return false;

        // Verifica se não é uma sequência repetida (00000000, 11111111, etc)
        if (/^(\d)\1+$/.test(cleanedCEP)) return false;

        return true;
      },
      {
        message: "CEP inválido.",
      }
    ),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  experiences: z.string().optional(),
});

type FormData = z.infer<typeof volunteerAddressSchema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

function VolunteerAddressTab({ defaultValues, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(volunteerAddressSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <Stack spacing={2}>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <TextField
              label="CEP (opcional)"
              {...field}
              value={field.value || ""}
              InputProps={{
                inputComponent: CepMaskInput as any,
              }}
              inputProps={{
                inputMode: "numeric",
                maxLength: 9,
                pattern: "[0-9-]*",
              }}
              error={!!errors.cep}
              helperText={errors.cep?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <TextField
              label="Rua (opcional)"
              {...field}
              error={!!errors.street}
              helperText={errors.street?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <TextField
              label="Número (opcional)"
              {...field}
              error={!!errors.number}
              helperText={errors.number?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="complement"
          control={control}
          render={({ field }) => (
            <TextField
              label="Complemento (opcional)"
              {...field}
              error={!!errors.complement}
              helperText={errors.complement?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="neighborhood"
          control={control}
          render={({ field }) => (
            <TextField
              label="Bairro (opcional)"
              {...field}
              error={!!errors.neighborhood}
              helperText={errors.neighborhood?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              label="Cidade (opcional)"
              {...field}
              error={!!errors.city}
              helperText={errors.city?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              label="Estado (opcional)"
              {...field}
              error={!!errors.state}
              helperText={errors.state?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="experiences"
          control={control}
          render={({ field }) => (
            <TextField
              label="Experiências (opcional)"
              {...field}
              multiline
              rows={3}
              error={!!errors.experiences}
              helperText={errors.experiences?.message}
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

export default VolunteerAddressTab;
