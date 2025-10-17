import { Box, Button, Divider, Stack, Typography, Chip } from "@mui/material";
import { Calendar, Clock, Edit3, MapPin, Trash, Users } from "lucide-react";
import type { Event } from "../../../../../../types/events.type";
import { getCategoryColor } from "../../../../../shared-components/functions/getCategoryColor";
import { getVacancyColor } from "../../../../../shared-components/functions/getVacancyColor";
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

  // Format date and duration
  const startDateObj = new Date(event.startDate);
  const formattedDate = startDateObj.toLocaleDateString("pt-BR");
  const formattedTime = startDateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDuration = `${event.durationMinutes / 60} horas`;

return (
    <Box
      key={event.id}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
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
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.common.black"
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
          </Box>
          <Typography color="text.common.black" mb={3}>
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
              <Typography variant="body2" color="text.common.black" sx={{ whiteSpace: "nowrap" }}>
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
                color="text.common.black"
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
              <Typography variant="body2" color="text.common.black">
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
                color="text.common.black"
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
                  color: getVacancyColor(availableVacancies, totalVacancies),
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
              sx={{ color: theme.palette.text.secondary , bgcolor: "hsl(240 63% 29%)" }}
              onClick={onEdit}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              startIcon={<Trash size={18} />}
              color="error"
              onClick={onDelete}
            >
              Excluir
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}