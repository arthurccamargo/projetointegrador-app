import { Box, Button, Divider, Stack, Typography, Chip } from "@mui/material";
import {
    Building,
  Calendar,
  Clock,
  Eye,
  MapPin,
  Users,
  Users2,
} from "lucide-react";
import type { Event } from "../../../../../../types/events.type";
import { getCategoryColor } from "../../../../../shared-components/functions/getCategoryColor";
import { getVacancyColor } from "../../../../../shared-components/functions/getVacancyColor";

interface EventToVolunteerCardProps {
  event: Event;
}

export default function EventCardToVolunteer({
  event,
}: EventToVolunteerCardProps) {

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
          <Divider sx={{ mb: 2}} />
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Building size={16} style={{ color: "#6b7280" }} />
            <Typography variant="body2" color="text.common.black">
              {event.ong?.name}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Eye size={18} />}
              sx={{ color: "#000" }}
            >
              Ver Onganização
            </Button>
            <Button
              variant="contained"
              startIcon={<Users2 size={18} />}
              color="success"
            >
              Participar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
