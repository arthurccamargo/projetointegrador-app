import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { isValidCPF } from "../../../../utils/validators/cpfValidator";
import { CPFMaskInput } from "../../../../shared-components/mask/CpfMask";
import { CepService } from "../../../../api/cep";
import { CepMaskInput } from "../../../../shared-components/mask/CepMask";

const ongAddressResponsibleSchema = z.object({
  cep: z
    .string()
    .min(1, "CEP obrigatório")
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
  responsibleEmail: "",
  documentUrl: "",
};

function OngAddressResponsibleTab({ defaultValues, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ongAddressResponsibleSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
  });

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
    <form onSubmit={handleSubmit(onNext)}>
      <Stack spacing={2}>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <TextField
              label="CEP"
              {...field}
              value={field.value || ""}
              onBlur={() => handleCepBlur(field.value)}
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
              placeholder="Rua"
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
              placeholder="Número"
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
              placeholder="Complemento (opcional)"
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
              placeholder="Bairro"
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
              placeholder="Cidade"
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
              placeholder="Estado"
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
              label="CPF do responsável"
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
