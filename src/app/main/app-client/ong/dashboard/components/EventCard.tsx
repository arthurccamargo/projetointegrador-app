import { Box, Button, Divider, Stack, Typography, Chip } from "@mui/material";
import { Calendar, Clock, Edit3, MapPin, Trash, Users } from "lucide-react";
import type { Event } from "../../../../../../types/events.type";
import { getCategoryColor } from "../../../../../shared-components/functions/getCategoryColor";
import { getVacancyColor } from "../../../../../shared-components/functions/getVacancyColor";
import { getStatusColor } from "../../../../../shared-components/functions/getStatusEvent";
import { formatDateTimeBrazil } from "../../../../../shared-components/functions/dateUtils";
import { useTheme } from '@mui/material/styles';


interface EventCardProps {
  event: Event;
  onDelete: () => Promise<void>;
  onEdit: () => Promise<void>;
}

export default function EventCard({ event, onDelete, onEdit }: EventCardProps) {
  const availableVacancies = event.currentCandidates;
  const totalVacancies = event.maxCandidates;
  const theme = useTheme();

  const { date: formattedDate, time: formattedTime } = formatDateTimeBrazil(event.startDate);
  const hours = Math.floor(event.durationMinutes / 60);
  const minutes = event.durationMinutes % 60;
  const formattedDuration = minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  const statusInfo = getStatusColor(event.status);

  return (
    <Box
      key={event.id}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 8,
        boxShadow: 1,
        border: "1px solid",
        borderColor: "grey.200",
        p: 3,
        transition: "box-shadow 0.3s, transform 0.3s",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box flex={1}>
          <Box display="flex" alignItems="center" gap={2} mb={2} bgcolor={ theme.palette.background.paper }>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
            >
              {event.title}
            </Typography>
            <Chip
              label={event.category?.name}
              size="small"
              sx={{
                backgroundColor: getCategoryColor(event.category?.name).bg,
                color: getCategoryColor(event.category?.name).color,
                fontWeight: 500,
              }}
            />
            <Chip
              label={statusInfo.label}
              size="small"
              sx={{
                backgroundColor: statusInfo.bg,
                color: statusInfo.color,
                fontWeight: 500,
              }}
            />
          </Box>
          <Typography color="text.primary" mb={3}>
            {event.description}
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "auto auto auto auto auto",
            }}
            gap={2}
            mb={2}
            sx={{
              alignItems: "center",
              justifyItems: "start",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={0.5}
              sx={{ minWidth: "fit-content" }}
            >
              <Calendar size={16} style={{ color: "#6b7280" }} />
              <Typography variant="body2" color="text.primary" sx={{ whiteSpace: "nowrap" }}>
                {formattedDate}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <Clock size={16} style={{ color: "#6b7280" }} />
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ ml: 0 }}
              >
                Hora de Início: {formattedTime}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <Clock size={16} style={{ color: "#6b7280" }} />
              <Typography variant="body2" color="text.primary">
                Duração: {formattedDuration}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
              sx={{ width: "100%", minWidth: 0 }}
            >
              <MapPin size={16} style={{ color: "#6b7280", flexShrink: 0 }} />
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  display: "block",
                }}
                title={event.location}
              >
                {event.location}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <Users
                size={16}
                style={{
                  color: '#6b7280',
                }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: getVacancyColor(availableVacancies, totalVacancies),
                }}
              >
                {`${availableVacancies}/${totalVacancies} vagas`}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Edit3 size={18} />}
              sx={{ borderRadius: 8, color: theme.palette.text.secondary , bgcolor: theme.palette.primary.main }}
              onClick={onEdit}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              startIcon={<Users size={18} />}
              sx={{ borderRadius: 8, color: theme.palette.text.secondary, bgcolor: theme.palette.warning.main}}
              onClick={onDelete}
            >
              Ver candidatos
            </Button>
            <Button
              variant="contained"
              startIcon={<Trash size={18} />}
              sx={{ borderRadius: 8, color: theme.palette.text.secondary, bgcolor: theme.palette.error.main}}
              onClick={onDelete}
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}