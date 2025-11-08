import { Box, Button, Divider, Stack, Typography, Chip, useTheme } from "@mui/material";
import { Building, Calendar, Clock, Eye, MapPin, X } from "lucide-react";
import { getCategoryColor } from "../../../../../shared-components/functions/getCategoryColor";
import { formatDateTimeBrazil } from "../../../../../shared-components/functions/dateUtils";
import { useNavigate } from "react-router-dom";
import type { EventApplication } from "../../../../../../types/event-applications.type";

interface EventToVolunteerCardProps {
  application: EventApplication;
  onCancel: (application: EventApplication) => Promise<void>;
}

export default function EventCardToVolunteer({
  application,
  onCancel,
}: EventToVolunteerCardProps) {
  const { date: formattedDate, time: formattedTime } = formatDateTimeBrazil(
    application.startDate
  );
  const hours = Math.floor(application.durationMinutes / 60);
  const minutes = application.durationMinutes % 60;
  const formattedDuration = minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      key={application.id}
      sx={{
        bgcolor: "#F8F8F8",
        borderRadius: 8,
        boxShadow: 1,
        border: "1px solid",
        borderColor: "grey.200",
        p: 3,
        transition: "box-shadow 0.3s, transform 0.3s",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-3px)",
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
              {application.title}
            </Typography>
            <Box display="flex" gap={0.5}>
              <Chip
                label={application.category?.name}
                size="small"
                sx={{
                  backgroundColor: getCategoryColor(application.category?.name)
                    .bg,
                  color: getCategoryColor(application.category?.name).color,
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
          <Typography color="text.common.black" mb={3}>
            {application.description}
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
              <Typography
                variant="body2"
                color="text.common.black"
                sx={{ whiteSpace: "nowrap" }}
              >
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
                title={application.location}
              >
                {application.location}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Building size={16} style={{ color: "#6b7280" }} />
            <Typography variant="body2" color="text.common.black">
              {application.ong?.name}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Eye size={18} />}
              sx={{ 
                borderRadius: 9, 
                color: theme.palette.text.secondary,
                width: { xs: '100%', sm: 'auto' }
              }}
              onClick={() => navigate(`/profile/${application.ong?.userId}`)}

            >
              Ver ONG
            </Button>
            {application.applicationStatus !== "CANCELLED" &&
              application.applicationStatus !== "REJECTED" && (
                <Button
                  variant="contained"
                  startIcon={<X size={18} />}
                  onClick={() => onCancel(application)}
                  sx={{ borderRadius: 9, 
                    bgcolor: theme.palette.error.main, 
                    color: theme.palette.text.secondary,
                    width: { xs: '100%', sm: 'auto' }  
                  }}
                >
                  Cancelar
                </Button>
              )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
