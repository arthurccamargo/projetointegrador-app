import { useState } from "react";
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
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckCircle } from "lucide-react";
import { getStatusColor } from "../../../../shared-components/functions/getStatusEvent";
import { useCheckInMutation, useGetEventNotificationsVolunteerQuery } from "../../../../api/EventApplicationApi";

interface EventNotification {
  applicationId: string;
  eventId: string;
  title: string;
  description: string;
  startDate: string;
  durationMinutes: number;
  location: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "SCHEDULED";
  ong: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  checkedIn: boolean;
  checkInAt: string | null;
  hasCheckInCode: boolean;
}

export default function NotificationsVolunteerPage() {
  const theme = useTheme();
  const { data: eventNotifications = [], refetch } =
    useGetEventNotificationsVolunteerQuery();
  const [checkIn] = useCheckInMutation();
  const [checkInCodes, setCheckInCodes] = useState<Record<string, string>>({});
  const [checkInErrors, setCheckInErrors] = useState<Record<string, string>>({});
  const [loadingCheckIn, setLoadingCheckIn] = useState<Record<string, boolean>>({});

  const handleCheckInCodeChange = (eventId: string, value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setCheckInCodes((prev) => ({ ...prev, [eventId]: numericValue }));
  };

  const handleCheckIn = async (eventId: string) => {
    const code = checkInCodes[eventId];
    if (code && code.length === 6) {
      setLoadingCheckIn(prev => ({ ...prev, [eventId]: true }));
      setCheckInErrors(prev => ({ ...prev, [eventId]: "" }));
      
      try {
        await checkIn({ eventId, code }).unwrap();
        setCheckInCodes(prev => ({ ...prev, [eventId]: "" }));
        await refetch();
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || "Erro ao fazer check-in";
        setCheckInErrors(prev => ({ ...prev, [eventId]: errorMessage }));
        console.error("Erro ao fazer check-in:", error);
      } finally {
        setLoadingCheckIn(prev => ({ ...prev, [eventId]: false }));
      }
    }
  };

  const formatStartDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCheckInDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
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
        <Typography color="black">Acompanhe suas notificações</Typography>
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
              Não há notificações no momento
            </Typography>
          </Box>
        ) : (
          eventNotifications.map((event: EventNotification) => {
            const statusInfo = getStatusColor(event.status);

            return (
              <Card
                key={event.applicationId}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  border: event.checkedIn
                    ? `2px solid ${theme.palette.success.main}`
                    : `2px solid ${statusInfo.bg}`,
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
                        bgcolor: event.checkedIn
                          ? theme.palette.success.main
                          : theme.palette.primary.main,
                        width: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: 64 },
                        fontSize: { xs: 28, sm: 32 },
                        flexShrink: 0,
                        alignSelf: { xs: "center", sm: "flex-start" },
                      }}
                    >
                      {event.checkedIn ? "✓" : "📅"}
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
                        <Chip
                          label={event.ong.name}
                          size="small"
                          variant="outlined"
                          sx={{
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

                      {/* Se já fez check-in, mostra mensagem de confirmação */}
                      {event.checkedIn ? (
                        <Box
                          sx={{
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(76, 175, 80, 0.15)"
                                : "rgba(76, 175, 80, 0.08)",
                            borderRadius: 3,
                            p: 3,
                            textAlign: "center",
                            border: `1px solid ${theme.palette.success.main}`,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: theme.palette.success.main,
                                borderRadius: "50%",
                                width: 64,
                                height: 64,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: `0 4px 12px ${theme.palette.success.main}40`,
                              }}
                            >
                              <CheckCircle size={40} color="white" />
                            </Box>
                          </Box>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="success.main"
                            sx={{ mb: 1 }}
                          >
                            Presença Confirmada!
                          </Typography>
                          <Typography variant="body2" color="black">
                            Você fez check-in com sucesso
                          </Typography>
                          {event.checkInAt && (
                            <Typography
                              variant="caption"
                              color="black"
                              sx={{ display: "block", mt: 1 }}
                            >
                              Check-in realizado em{" "}
                              {formatCheckInDate(event.checkInAt)}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        /* Se não fez check-in, mostra o formulário */
                        <Box
                          sx={{
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(33, 150, 243, 0.15)"
                                : "rgba(33, 150, 243, 0.08)",
                            borderRadius: 2,
                            p: 2,
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="black"
                            sx={{
                              display: "block",
                              mb: 2,
                              textAlign: "center",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              letterSpacing: 1,
                            }}
                          >
                            Código de Check-in
                          </Typography>
                          
                          {checkInErrors[event.eventId] && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                              {checkInErrors[event.eventId]}
                            </Alert>
                          )}

                          <TextField
                            fullWidth
                            value={checkInCodes[event.eventId] || ""}
                            onChange={(e) =>
                              handleCheckInCodeChange(
                                event.eventId,
                                e.target.value
                              )
                            }
                            placeholder="000000"
                            variant="outlined"
                            error={!!checkInErrors[event.eventId]}
                            inputProps={{
                              maxLength: 6,
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                              style: {
                                textAlign: "center",
                                fontSize: "2rem",
                                fontFamily: "monospace",
                                letterSpacing: "0.5rem",
                                fontWeight: "bold",
                              },
                            }}
                            sx={{
                              mb: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => handleCheckIn(event.eventId)}
                            disabled={
                              !checkInCodes[event.eventId] ||
                              checkInCodes[event.eventId].length !== 6 ||
                              loadingCheckIn[event.eventId]
                            }
                            sx={{
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: "bold",
                            }}
                          >
                            {loadingCheckIn[event.eventId] ? "Verificando..." : "Fazer Check-in"}
                          </Button>
                        </Box>
                      )}
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
