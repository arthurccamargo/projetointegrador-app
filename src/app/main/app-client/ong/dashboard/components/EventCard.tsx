import { Box, Button, Divider, Stack, Typography, Chip, IconButton } from "@mui/material";
import {
  Calendar,
  Clock,
  Edit3,
  Eye,
  MapPin,
  Trash,
  Users,
} from "lucide-react";
import type { Event } from "../../../../../../types/events.type";

interface EventCardProps {
  event: Event;
  onDelete: () => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<
      string,
      "primary" | "success" | "warning" | "error" | "default"
    > = {
      "Assistência Social": "primary",
      "Meio Ambiente": "success",
      Educação: "warning",
      Saúde: "error",
    };
    return colors[category] || "default";
  };

  const getVacancyColor = (available: number, total: number) => {
    const percent = (available / total) * 100;
    if (percent > 50) return "success.main";
    if (percent > 20) return "warning.main";
    return "error.main";
  };

  const availableVacancies = event.currentCandidates;
  const totalVacancies = event.maxCandidates;

  // Format date and duration
  const formattedDate = new Date(event.startDate).toLocaleDateString("pt-BR");
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
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box flex={1}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h6" fontWeight="bold" color="text.common.black">
              {event.title}
            </Typography>
            <Chip
              label={event.category?.name}
              color={getCategoryColor(event.category?.name)}
              size="small"
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
              lg: "repeat(4, 1fr)",
            }}
            gap={2}
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Calendar size={16} style={{ color: "#6b7280" }} />
              <Typography variant="body2" color="text.common.black">
                {formattedDate}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Clock size={16} style={{ color: "#6b7280" }} />
              <Typography variant="body2" color="text.common.black">
                {formattedDuration}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <MapPin size={16} style={{ color: "#6b7280" }} />
              <Typography variant="body2" color="text.common.black">
                {event.location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
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
              variant="outlined"
              startIcon={<Eye size={18} />}
              color="inherit"
            >
              Ver Detalhes
            </Button>
            <Button
              variant="contained"
              startIcon={<Edit3 size={18} />}
              color="primary"
            >
              Gerenciar
            </Button>
            <IconButton color="error" onClick={onDelete}>
              <Trash size={20} />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
