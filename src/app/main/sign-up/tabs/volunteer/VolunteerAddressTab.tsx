import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CepMaskInput } from "../../../../shared-components/mask/CepMask";
import { CepService } from "../../../../api/cep";
import { useTheme } from "../../../../../theme/useTheme";

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
        message: "CEP inválido",
      }
    ),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  //experiences: z.string().optional(),
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
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(volunteerAddressSchema),
    defaultValues,
  });
  const theme = useTheme();

  const handleCepBlur = async (cep?: string) => {
    if (!cep) return;
    try {
      const data = await CepService.getAddress(cep);

      if (data) {
        setValue("street", data.logradouro || "");
        setValue("neighborhood", data.bairro || "");
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-sm"
      onSubmit={handleSubmit(onNext)}
    >
      <Controller
        name="cep"
        control={control}
        render={({ field }) => (
          <TextField
            label="CEP (opcional)"
            placeholder="00000-000"
            {...field}
            value={field.value || ""}
            onBlur={() => handleCepBlur(field.value)}
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
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
            placeholder="Rua"
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            {...field}
            error={!!errors.street}
            helperText={errors.street?.message}
            fullWidth
          />
        )}
      />
      <Box className="flex gap-2">
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <TextField
              label="Número (opcional)"
              placeholder="Número"
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
              {...field}
              error={!!errors.number}
              helperText={errors.number?.message}
            />
          )}
        />
        <Controller
          name="complement"
          control={control}
          render={({ field }) => (
            <TextField
              label="Complemento (opcional)"
              placeholder="Complemento"
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
              {...field}
              error={!!errors.complement}
              helperText={errors.complement?.message}
              fullWidth
            />
          )}
        />
      </Box>
      <Controller
        name="neighborhood"
        control={control}
        render={({ field }) => (
          <TextField
            label="Bairro (opcional)"
            placeholder="Bairro"
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            {...field}
            error={!!errors.neighborhood}
            helperText={errors.neighborhood?.message}
            fullWidth
          />
        )}
      />
      <Box className="flex gap-2">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              label="Cidade (opcional)"
              placeholder="Cidade"
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
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
              placeholder="Estado"
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
              {...field}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          )}
        />
      </Box>
      {/* Campo para experiências 
        <Controller
          name="experiences"
          control={control}
          render={({ field }) => (
            <TextField
              label="Experiências (opcional)"
              placeholder="Experiências (opcional)"
              {...field}
              multiline
              rows={3}
              error={!!errors.experiences}
              helperText={errors.experiences?.message}
              fullWidth
            />
          )}
        />
        */}
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Button variant="outlined" onClick={onBack}>
          Voltar
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: "theme.palette.primary.main",
            color: theme.palette.text.secondary,
          }}
        >
          Próximo
        </Button>
      </Box>
    </form>
  );
}

export default VolunteerAddressTab;
