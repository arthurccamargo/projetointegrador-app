import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { isValidCPF } from "../../../../utils/validators/cpfValidator";
import { CPFMaskInput } from "../../../../shared-components/mask/CpfMask";

const ongAddressResponsibleSchema = z.object({
  cep: z.string().min(1, "CEP obrigatório"),
  street: z.string().min(1, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().min(1, "Estado obrigatório"),
  responsibleName: z.string().min(3, "Nome do responsável obrigatório"),
  responsibleCpf: z
    .string()
    .min(14, "CPF deve ter 14 caracteres")
    .nonempty({ message: "Digite o CPF" })
    .refine(isValidCPF, "CPF inválido"),
  birthDate: z.string().optional(),
  responsibleEmail: z.email("E-mail do responsável inválido"),
  documentUrl: z.string().optional(),
});

type FormData = z.infer<typeof ongAddressResponsibleSchema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

const defaultFormValues: FormData = {
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  responsibleName: "",
  responsibleCpf: "",
  birthDate: "",
  responsibleEmail: "",
  documentUrl: "",
};

function OngAddressResponsibleTab({ defaultValues, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ongAddressResponsibleSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <Stack spacing={2}>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <TextField
              label="CEP"
              {...field}
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
              label="Rua"
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
              label="Número"
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
              label="Complemento"
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
              label="Bairro"
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
              label="Cidade"
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
              label="Estado"
              {...field}
              error={!!errors.state}
              helperText={errors.state?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="responsibleName"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nome do responsável"
              {...field}
              error={!!errors.responsibleName}
              helperText={errors.responsibleName?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="responsibleCpf"
          control={control}
          render={({ field }) => (
            <TextField
              label="CPF"
              {...field}
              InputProps={{
                inputComponent: CPFMaskInput as any,
              }}
              error={!!errors.responsibleCpf}
              helperText={errors.responsibleCpf?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="responsibleEmail"
          control={control}
          render={({ field }) => (
            <TextField
              label="E-mail do responsável"
              {...field}
              error={!!errors.responsibleEmail}
              helperText={errors.responsibleEmail?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="documentUrl"
          control={control}
          render={({ field }) => (
            <TextField
              label="Documento (URL)"
              {...field}
              error={!!errors.documentUrl}
              helperText={errors.documentUrl?.message}
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

export default OngAddressResponsibleTab;
