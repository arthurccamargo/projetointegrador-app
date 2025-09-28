import { Box, Button, Divider, Stack, Typography, Chip } from "@mui/material";
import {
  Building2,
  Calendar,
  Clock,
  Edit3,
  Eye,
  MapPin,
  Users,
} from "lucide-react";
import type { Event } from "../../../../../../types/events.type";

export default function EventCard({ event }: { event: Event }) {
  const getCategoriaColor = (categoria: string) => {
    const colors: Record<
      string,
      "primary" | "success" | "warning" | "error" | "default"
    > = {
      "Assistência Social": "primary",
      "Meio Ambiente": "success",
      Educação: "warning",
      Saúde: "error",
    };
    return colors[categoria] || "default";
  };

  const getVagasColor = (disponiveis: number, total: number) => {
    const percentual = (disponiveis / total) * 100;
    if (percentual > 50) return "success.main";
    if (percentual > 20) return "warning.main";
    return "error.main";
  };

  const vagasDisponiveis = event.maxCandidates - event.currentCandidates;
  const totalVagas = event.maxCandidates;

  // Format date and duration
  const dataFormatada = new Date(event.startDate).toLocaleDateString("pt-BR");
  const horaFormatada = `${event.durationMinutes} minutos`;

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
          {/* Title and Category */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h6" fontWeight="bold" color="text.common.black">
              {event.title}
            </Typography>
            <Chip
              label={event.category?.name}
              color={getCategoriaColor(event.category?.name)}
              size="small"
            />
          </Box>
          {/* Description */}
          <Typography color="text.common.black" mb={3}>
            {event.description}
          </Typography>
          {/* Event Details */}
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
                {dataFormatada}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Clock size={16} style={{ color: "#6b7280" }} />
              <Typography variant="body2" color="text.common.black">
                {horaFormatada}
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
                  color: getVagasColor(vagasDisponiveis, totalVagas),
                }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: getVagasColor(vagasDisponiveis, totalVagas),
                }}
              >
                {`${vagasDisponiveis}/${totalVagas} vagas`}
              </Typography>
            </Box>
          </Box>
          {/* Divider */}
          <Divider sx={{ my: 2 }} />
          {/* Organization */}
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <Building2 size={16} style={{ color: "#6b7280" }} />
            <Typography variant="body2" color="text.common.black">
              {event.ong?.name}
            </Typography>
          </Box>
          {/* Action Buttons */}
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
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
