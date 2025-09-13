import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { isValidCPF } from "../../../../utils/validators/cpfValidator";
import { CPFMaskInput } from "../../../../shared-components/mask/CpfMask";
import { CepService } from "../../../../api/cep";
import { CepMaskInput } from "../../../../shared-components/mask/CepMask";
import { useTheme } from "../../../../../theme/useTheme";

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
  number: z.string().optional(),
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

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.paper,
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: theme.palette.primary.main,
      },
    },
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
            label="CEP"
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
            sx={textFieldStyles}
          />
        )}
      />

      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <TextField
            label="Rua"
            placeholder="Rua"
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            {...field}
            error={!!errors.street}
            helperText={errors.street?.message}
            fullWidth
            sx={textFieldStyles}
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
              value={field.value || ""}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
                field.onChange(onlyNums);
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={!!errors.number}
              helperText={errors.number?.message}
              sx={{ ...textFieldStyles, flex: 1 }}
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
              sx={{ ...textFieldStyles, flex: 2 }}
            />
          )}
        />
      </Box>

      <Controller
        name="neighborhood"
        control={control}
        render={({ field }) => (
          <TextField
            label="Bairro"
            placeholder="Bairro"
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            {...field}
            error={!!errors.neighborhood}
            helperText={errors.neighborhood?.message}
            fullWidth
            sx={textFieldStyles}
          />
        )}
      />

      <Box className="flex gap-2">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              label="Cidade"
              placeholder="Cidade"
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
              {...field}
              error={!!errors.city}
              helperText={errors.city?.message}
              sx={{ ...textFieldStyles, flex: 2 }}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              label="Estado"
              placeholder="Estado"
              InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
              {...field}
              error={!!errors.state}
              helperText={errors.state?.message}
              sx={{ ...textFieldStyles, flex: 1 }}
            />
          )}
        />
      </Box>

      <Controller
        name="responsibleName"
        control={control}
        render={({ field }) => (
          <TextField
            label="Nome do responsável"
            placeholder="Nome do responsável"
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            {...field}
            error={!!errors.responsibleName}
            helperText={errors.responsibleName?.message}
            fullWidth
            sx={textFieldStyles}
          />
        )}
      />

      <Controller
        name="responsibleCpf"
        control={control}
        render={({ field }) => (
          <TextField
            label="CPF do responsável"
            placeholder="000.000.000-00"
            {...field}
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            InputProps={{
              inputComponent: CPFMaskInput as any,
            }}
            error={!!errors.responsibleCpf}
            helperText={errors.responsibleCpf?.message}
            fullWidth
            sx={textFieldStyles}
          />
        )}
      />

      <Controller
        name="responsibleEmail"
        control={control}
        render={({ field }) => (
          <TextField
            label="E-mail do responsável"
            placeholder="emaildoresponsavel@exemplo.com"
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            {...field}
            error={!!errors.responsibleEmail}
            helperText={errors.responsibleEmail?.message}
            fullWidth
            sx={textFieldStyles}
          />
        )}
      />

      <Controller
        name="documentUrl"
        control={control}
        render={({ field }) => (
          <TextField
            label="Documento (URL)"
            placeholder="Link para o documento (opcional)"
            InputLabelProps={{ shrink: true, style: { color: "#A1A1A1" } }}
            {...field}
            error={!!errors.documentUrl}
            helperText={errors.documentUrl?.message}
            fullWidth
            sx={textFieldStyles}
          />
        )}
      />

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Button variant="outlined" onClick={onBack}>
          Voltar
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: "theme.palette.primary.main",
            color: theme.palette.common.black,
          }}
        >
          Próximo
        </Button>
      </Box>
    </form>
  );
}

export default OngAddressResponsibleTab;
