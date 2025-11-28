import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetEventNotificationsOngQuery } from "../../../../api/EventApi";
import { getStatusColor } from "../../../../shared-components/functions/getStatusEvent";

interface EventNotification {
  id: string;
  title: string;
  description: string;
  startDate: string;
  durationMinutes: number;
  location: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "SCHEDULED";
  checkInCode: string;
  checkInCodeGeneratedAt: string;
}

export default function NotificationsOngPage() {
  const theme = useTheme();
  const { data: eventNotifications = [] } = useGetEventNotificationsOngQuery();

  const formatStartDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        px: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 12, md: 4 },
        pt: 2,
      }}
    >
      <Box
        mb={4}
        width="100%"
        maxWidth="400px"
        color={theme.palette.text.primary}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1}>
          Notificações
        </Typography>
        <Typography color="text.primary">
          Acompanhe suas notificações
        </Typography>
      </Box>

      <Stack spacing={3} width="100%">
        {eventNotifications.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Typography color="text.primary">
              Não há notificações no momento
            </Typography>
          </Box>
        ) : (
          eventNotifications.map((event: EventNotification) => {
            const statusInfo = getStatusColor(event.status);

            return (
              <Card
                key={event.id}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 8,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: 1,
                  transition: "box-shadow 0.3s, transform 0.3s",
                  "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    display="flex"
                    gap={{ xs: 2, sm: 3 }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >

                    <Box flex={1} minWidth={0}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="text.primary"
                        sx={{
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                          mb: 1,
                        }}
                      >
                        {event.title}
                      </Typography>

                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                        flexWrap="wrap"
                      >
                        <Chip
                          label={event.category.name}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            color: "white",
                            fontWeight: "medium",
                          }}
                        />
                        <Chip
                          label={statusInfo.label}
                          size="small"
                          sx={{
                            bgcolor: statusInfo.bg,
                            color: statusInfo.color,
                            fontWeight: "medium",
                          }}
                        />
                      </Box>

                      <Stack spacing={1.5} mb={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" color="text.primary">
                            📍 {event.location}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" color="text.primary">
                            🕐 {formatStartDate(event.startDate)}
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      <Box
                        sx={{
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(33, 150, 243, 0.15)"
                              : "rgba(33, 150, 243, 0.08)",
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.primary"
                          sx={{
                            display: "block",
                            mb: 1,
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            letterSpacing: 1,
                          }}
                        >
                          Código de Check-in
                        </Typography>
                        <Typography
                          variant="h3"
                          fontWeight="bold"
                          color="primary"
                          sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem" },
                            letterSpacing: 8,
                            fontFamily: "monospace",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {event.checkInCode}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>
    </Box>
  );
}
