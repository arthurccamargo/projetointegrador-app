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

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
}

const eventSchema = z.object({
  title: z.string().min(3, 'Título obrigatório'),
  category: z.string().min(1, 'Selecione uma categoria'),
  description: z.string().optional(),
  date: z.string().min(1, 'Data obrigatória'),
  duration: z.string().min(1, 'Duração obrigatória'),
  maxVolunteers: z.string().min(1, 'Máx. Voluntários obrigatório'),
  location: z.string().min(3, 'Local obrigatório')
});

type EventFormValues = z.infer<typeof eventSchema>;

export const CreateEventModal = ({ open, onClose }: CreateEventModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      date: '',
      duration: '',
      maxVolunteers: '',
      location: ''
    }
  });

  const onSubmit = (data: EventFormValues) => {
    console.log('Dados da oportunidade:', data);
    handleCancel();
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

          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2">
              Categoria
            </Typography>
            <FormControl fullWidth error={!!errors.category}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                  >
                    <MenuItem value="">Selecione uma categoria</MenuItem>
                    <MenuItem value="alimentacao">Alimentação</MenuItem>
                    <MenuItem value="educacao">Educação</MenuItem>
                    <MenuItem value="saude">Saúde</MenuItem>
                    <MenuItem value="meio-ambiente">Meio Ambiente</MenuItem>
                    <MenuItem value="assistencia-social">Assistência Social</MenuItem>
                    <MenuItem value="cultura">Cultura</MenuItem>
                  </Select>
                )}
              />
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category.message}
                </Typography>
              )}
            </FormControl>
          </Box>

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

          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              width: '100%'
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Data
              </Typography>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    placeholder="Ex: 15 de Janeiro, 2024"
                    error={!!errors.date}
                    helperText={errors.date?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Duração
              </Typography>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Ex: 4 horas"
                    variant="outlined"
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                Máx. Voluntários
              </Typography>
              <Controller
                name="maxVolunteers"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    placeholder="20"
                    variant="outlined"
                    error={!!errors.maxVolunteers}
                    helperText={errors.maxVolunteers?.message}
                  />
                )}
              />
            </Box>
          </Box>

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