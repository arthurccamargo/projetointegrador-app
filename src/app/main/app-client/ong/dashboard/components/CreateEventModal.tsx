import { useTheme, useMediaQuery } from '@mui/material';
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
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCategoriesQuery } from '../../../../../api/CategoryApi';

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (formData: EventFormValues) => void;
}

const eventSchema = z.object({
  title: z.string().min(3, 'Título obrigatório'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  description: z.string().optional(),
  startDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Data inválida (ISO 8601)' }),
  duration: z.string()
    .refine(
      (val) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(val),
      { message: 'Formato: hh:mm' }
    ),
  maxCandidates: z.string()
    .refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, { message: 'Apenas números inteiros' }),
  location: z.string().min(3, 'Local obrigatório')
});

type EventFormValues = z.infer<typeof eventSchema> & { durationMinutes?: number };

function parseDateToISO(dateStr: string): string | null {
  // Espera formato dd/MM/yy HH:mm
  const match = /^(\d{2})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const [_, day, month, year, hour, minute] = match;
  // Assume século 2000 para ano com dois dígitos
  const fullYear = parseInt(year, 10) < 50 ? '20' + year : '19' + year;
  const dateObj = new Date(
    `${fullYear}-${month}-${day}T${hour}:${minute}:00`
  );
  return dateObj.toISOString();
}

function parseDurationToMinutes(duration: string): number {
  const match = /^([0-1]?\d|2[0-3]):([0-5]\d)$/.exec(duration);
  if (!match) return 0;
  const [, hours, minutes] = match;
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

export const CreateEventModal = ({ open, onClose, onCreate }: CreateEventModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      categoryId: '',
      description: '',
      startDate: '',
      duration: '',
      maxCandidates: '',
      location: ''
    }
  });

  const onSubmit = (data: EventFormValues) => {
    const durationMinutes = parseDurationToMinutes(data.duration);
    const formattedData = {
      ...data,
      startDate: data.startDate, // já está em ISO 8601
      maxCandidates: parseInt(data.maxCandidates, 10),
      durationMinutes
    };
    onCreate(formattedData);
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
          minHeight: isMobile ? '100vh' : 'auto'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Criar Nova Oportunidade
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Título */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
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

          {/* Categoria */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2">
              Categoria
            </Typography>
            <FormControl fullWidth error={!!errors.categoryId}>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    disabled={isLoading}
                  >
                    <MenuItem value="">Selecione uma categoria</MenuItem>
                    {Array.isArray(categories) && categories.map((cat) => (
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

          {/* Descrição */}
          <Box sx={{ width: '100%' }}>
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

          {/* Data, Duração, Máx. Candidatos */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              width: '100%'
            }}
          >
            {/* Data (startDate) */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Data (ISO 8601)
              </Typography>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    placeholder="Ex: 2024-01-15T14:00:00"
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                  />
                )}
              />
            </Box>
            {/* Duração */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Duração (hh:mm)
              </Typography>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    placeholder="Ex: 02:30"
                    variant="outlined"
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                  />
                )}
              />
            </Box>
            {/* Máx. Candidatos */}
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
          <Box sx={{ width: '100%' }}>
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

      <DialogActions
        sx={{
          p: 3,
          gap: 2,
          flexDirection: isMobile ? 'column-reverse' : 'row',
          borderTop: '1px solid #e0e0e0'
        }}
      >
        <Button
          onClick={handleCancel}
          variant="outlined"
          fullWidth={isMobile}
          sx={{
            color: 'grey.600',
            borderColor: 'grey.300',
            '&:hover': {
              borderColor: 'grey.400',
              backgroundColor: 'grey.50'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          fullWidth={isMobile}
          sx={{
            backgroundColor: '#f9c74f',
            color: '#000',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#f8b500'
            }
          }}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;