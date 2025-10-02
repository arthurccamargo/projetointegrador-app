import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategoriesQuery } from "../../../../../api/CategoryApi";
import type { Event } from "../../../../../../types/events.type";

interface EditEventModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (formData: Partial<Event>) => void;
  event: Event | null;
  loading?: boolean;
}

const eventSchema = z
  .object({
    title: z.string().min(3, "Título obrigatório"),
    categoryId: z.string().min(1, "Selecione uma categoria"),
    description: z.string().optional(),
    startDate: z.string().min(1, "Data obrigatória"),
    startTime: z.string().min(1, "Hora de início obrigatória"),
    endTime: z.string().min(1, "Hora de término obrigatória"),
    maxCandidates: z
      .string()
      .refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
        message: "Apenas números inteiros",
      }),
    location: z.string().min(3, "Local obrigatório"),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      const start = data.startTime.split(":").map(Number);
      const end = data.endTime.split(":").map(Number);
      const startMinutes = start[0] * 60 + start[1];
      const endMinutes = end[0] * 60 + end[1];
      return endMinutes > startMinutes;
    },
    {
      message: "Hora de término deve ser posterior à hora de início",
      path: ["endTime"],
    }
  );

type EventFormValues = z.infer<typeof eventSchema> & {
  durationMinutes?: number;
};

function combineDateTime(dateStr: string, timeStr: string): string {
  return `${dateStr}T${timeStr}:00`;
}

function calculateDurationMinutes(startTime: string, endTime: string): number {
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);
  const startMinutes = start[0] * 60 + start[1];
  const endMinutes = end[0] * 60 + end[1];
  return endMinutes - startMinutes;
}

export default function EditEventModal({
  open,
  onClose,
  onConfirm,
  event,
  loading = false,
}: EditEventModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      description: "",
      startDate: "",
      startTime: "",
      endTime: "",
      maxCandidates: "",
      location: "",
    },
  });

  useEffect(() => {
    if (event && open) {
      const startDateObj = new Date(event.startDate);
      const dateStr = startDateObj.toISOString().slice(0, 10);
      const timeStr = startDateObj.toISOString().slice(11, 16);

      // Calcula hora de término somando durationMinutes ao horário de início
      const [startHour, startMinute] = timeStr.split(":").map(Number);
      const totalStartMinutes = startHour * 60 + startMinute;
      const totalEndMinutes = totalStartMinutes + event.durationMinutes;
      const endHour = Math.floor(totalEndMinutes / 60);
      const endMinute = totalEndMinutes % 60;
      const endTimeStr = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;

      reset({
        title: event.title,
        categoryId: event.categoryId,
        description: event.description ?? "",
        startDate: dateStr,
        startTime: timeStr,
        endTime: endTimeStr,
        maxCandidates: String(event.maxCandidates),
        location: event.location,
      });
    }
  }, [event, open, reset]);

  const onSubmit = (data: EventFormValues) => {
    const durationMinutes = calculateDurationMinutes(
      data.startTime,
      data.endTime
    );
    const combinedStartDate = combineDateTime(data.startDate, data.startTime);

    const formattedData = {
      ...data,
      startDate: combinedStartDate,
      maxCandidates: parseInt(data.maxCandidates, 10),
      durationMinutes,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { startTime, endTime, ...finalData } = formattedData;
    onConfirm(finalData);
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          margin: isMobile ? 0 : 2,
          borderRadius: isMobile ? 0 : 2,
          minHeight: isMobile ? "100vh" : "auto",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Editar Oportunidade
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Título da Oportunidade
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Ex: Distribuição de Alimentos"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle2">
              Categoria
            </Typography>
            <FormControl fullWidth error={!!errors.categoryId}>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select {...field} displayEmpty disabled={isLoading}>
                    <MenuItem value="">Selecione uma categoria</MenuItem>
                    {Array.isArray(categories) &&
                      categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              {errors.categoryId && (
                <Typography variant="caption" color="error">
                  {errors.categoryId.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle2">
              Descrição
            </Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Descreva a atividade e o que o voluntário irá fazer..."
                  multiline
                  rows={4}
                  variant="outlined"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Data de Início
              </Typography>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    variant="outlined"
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Hora de Início
              </Typography>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="time"
                    variant="outlined"
                    error={!!errors.startTime}
                    helperText={errors.startTime?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Hora de Término
              </Typography>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="time"
                    variant="outlined"
                    error={!!errors.endTime}
                    helperText={errors.endTime?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Máx. Candidatos
              </Typography>
              <Controller
                name="maxCandidates"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    inputProps={{ step: 1, min: 1 }}
                    placeholder="20"
                    variant="outlined"
                    error={!!errors.maxCandidates}
                    helperText={errors.maxCandidates?.message}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Local */}
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle2">
              Local
            </Typography>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Ex: Centro de Distribuição - Vila Madalena"
                  variant="outlined"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          p: 3,
          gap: 2,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button
          onClick={handleCancel}
          variant="outlined"
          fullWidth={isMobile}
          sx={{
            flex: 1,
            borderRadius: 2,
            fontWeight: 500,
            color: "grey.600",
            borderColor: "grey.300",
            "&:hover": {
              borderColor: "grey.400",
              backgroundColor: "grey.50",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          fullWidth={isMobile}
          sx={{
            flex: 1,
            borderRadius: 2,
            fontWeight: 500,
            backgroundColor: "theme.palette.primary.main",
            color: "#000",
            "&:hover": {
              backgroundColor: "theme.palette.primary.dark",
            },
          }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
