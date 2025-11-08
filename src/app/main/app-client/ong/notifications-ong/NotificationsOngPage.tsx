import {
  Container,
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
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
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'SCHEDULED';
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
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        minHeight: "100vh",
        position: "relative",
        mb: 2,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1}>
          Notificações
        </Typography>
        <Typography color="black">
          Códigos de check-in dos eventos ativos
        </Typography>
      </Box>

      <Stack spacing={3}>
        {eventNotifications.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Typography
              variant="h6"
              fontWeight="medium"
              color="text.primary"
              mb={1}
            >
              Nenhuma notificação
            </Typography>
            <Typography color="black">
              Não há eventos ativos no momento
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
                  border: `2px solid ${statusInfo.bg}`,
                  boxShadow: theme.shadows[2],
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: theme.shadows[6],
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    display="flex"
                    gap={{ xs: 2, sm: 3 }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: 64 },
                        fontSize: { xs: 28, sm: 32 },
                        flexShrink: 0,
                        alignSelf: { xs: "center", sm: "flex-start" },
                      }}
                    >
                      📅
                    </Avatar>

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
                          <Typography variant="body2" color="black">
                            📍 {event.location}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" color="black">
                            🕐 {formatStartDate(event.startDate)} •{" "}
                            {event.durationMinutes} minutos
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
                          color="black"
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
    </Container>
  );
}
