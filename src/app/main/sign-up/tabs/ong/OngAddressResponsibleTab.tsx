import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ongAddressResponsibleSchema } from "../../validation/ongSchemas";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type FormData = z.infer<typeof ongAddressResponsibleSchema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

function OngAddressResponsibleTab({ defaultValues, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ongAddressResponsibleSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <Stack spacing={2}>
        <TextField label="CEP" {...register("cep")} error={!!errors.cep} helperText={errors.cep?.message} fullWidth />
        <TextField label="Rua" {...register("street")} error={!!errors.street} helperText={errors.street?.message} fullWidth />
        <TextField label="Número" {...register("number")} error={!!errors.number} helperText={errors.number?.message} fullWidth />
        <TextField label="Complemento" {...register("complement")} error={!!errors.complement} helperText={errors.complement?.message} fullWidth />
        <TextField label="Bairro" {...register("neighborhood")} error={!!errors.neighborhood} helperText={errors.neighborhood?.message} fullWidth />
        <TextField label="Cidade" {...register("city")} error={!!errors.city} helperText={errors.city?.message} fullWidth />
        <TextField label="Estado" {...register("state")} error={!!errors.state} helperText={errors.state?.message} fullWidth />
        <TextField label="Nome do responsável" {...register("responsibleName")} error={!!errors.responsibleName} helperText={errors.responsibleName?.message} fullWidth />
        <TextField label="CPF do responsável" {...register("responsibleCpf")} error={!!errors.responsibleCpf} helperText={errors.responsibleCpf?.message} fullWidth />
        <TextField label="E-mail do responsável" {...register("responsibleEmail")} error={!!errors.responsibleEmail} helperText={errors.responsibleEmail?.message} fullWidth />
        <TextField label="Documento (URL)" {...register("documentUrl")} error={!!errors.documentUrl} helperText={errors.documentUrl?.message} fullWidth />
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

export default OngAddressResponsibleTab;
