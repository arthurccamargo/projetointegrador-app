import { useState } from "react";
import {
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckCircle, Star, X } from "lucide-react";
import { getStatusColor } from "../../../../shared-components/functions/getStatusEvent";
import {
  useCheckInMutation,
  useGetEventNotificationsVolunteerQuery,
} from "../../../../api/EventApplicationApi";
import {
  useGetEligibleApplicationsQuery,
  type EligibleApplication,
  useCreateReviewMutation,
} from "../../../../api/ReviewApi";

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
  const { data: eligibleApplications = [], refetch: refetchEligible } =
    useGetEligibleApplicationsQuery();
  const [checkIn] = useCheckInMutation();
  const [createReview, { isLoading: isCreatingReview }] =
    useCreateReviewMutation();
  const [checkInCodes, setCheckInCodes] = useState<Record<string, string>>({});
  const [checkInErrors, setCheckInErrors] = useState<Record<string, string>>(
    {}
  );
  const [loadingCheckIn, setLoadingCheckIn] = useState<Record<string, boolean>>(
    {}
  );

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<EligibleApplication | null>(null);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleCheckInCodeChange = (eventId: string, value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setCheckInCodes((prev) => ({ ...prev, [eventId]: numericValue }));
  };

  const handleCheckIn = async (eventId: string) => {
    const code = checkInCodes[eventId];
    if (code && code.length === 6) {
      setLoadingCheckIn((prev) => ({ ...prev, [eventId]: true }));
      setCheckInErrors((prev) => ({ ...prev, [eventId]: "" }));

      try {
        await checkIn({ eventId, code }).unwrap();
        setCheckInCodes((prev) => ({ ...prev, [eventId]: "" }));
        await refetch();
      } catch (error: unknown) {
        const errorMessage =
          error &&
          typeof error === "object" &&
          "data" in error &&
          error.data &&
          typeof error.data === "object" &&
          "message" in error.data
            ? String(error.data.message)
            : error && typeof error === "object" && "message" in error
              ? String(error.message)
              : "Erro ao fazer check-in";
        setCheckInErrors((prev) => ({ ...prev, [eventId]: errorMessage }));
        console.error("Erro ao fazer check-in:", error);
      } finally {
        setLoadingCheckIn((prev) => ({ ...prev, [eventId]: false }));
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

  const formatHoursRemaining = (hours: number) => {
    if (hours < 1) {
      const minutes = Math.floor(hours * 60);
      return `${minutes} minutos`;
    }
    return `${hours.toFixed(1)} horas`;
  };

  const handleOpenReviewModal = (application: EligibleApplication) => {
    setSelectedApplication(application);
    setRating(0);
    setComment("");
    setReviewError("");
    setReviewSuccess(false);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedApplication(null);
    setRating(0);
    setComment("");
    setReviewError("");
    setReviewSuccess(false);
  };

  const handleSubmitReview = async () => {
    if (!selectedApplication) return;

    if (!rating || rating === 0) {
      setReviewError("Por favor, selecione uma avaliação");
      return;
    }

    setReviewError("");

    try {
      await createReview({
        applicationId: selectedApplication.applicationId,
        rating: rating,
        comment: comment.trim() || undefined,
      }).unwrap();

      setReviewSuccess(true);
      await refetchEligible();

      setTimeout(() => {
        handleCloseReviewModal();
      }, 2000);
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? String(error.data.message)
          : error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Erro ao enviar avaliação";
      setReviewError(errorMessage);
      console.error("Erro ao enviar avaliação:", error);
    }
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

      {eligibleApplications.length > 0 && (
        <Box mb={4}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            mb={2}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Star
              size={24}
              color={theme.palette.warning.main}
              fill={theme.palette.warning.main}
            />
            Eventos para Avaliar
          </Typography>
          <Stack spacing={2}>
            {eligibleApplications.map((application: EligibleApplication) => (
              <Card
                key={application.applicationId}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  border: `2px solid ${theme.palette.warning.main}`,
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
                        bgcolor: theme.palette.warning.main,
                        width: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: 64 },
                        fontSize: { xs: 28, sm: 32 },
                        flexShrink: 0,
                        alignSelf: { xs: "center", sm: "flex-start" },
                      }}
                    >
                      <Star size={32} />
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
                        {application.event.title}
                      </Typography>

                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                        flexWrap="wrap"
                      >
                        <Chip
                          label={application.event.category.name}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            color: "white",
                            fontWeight: "medium",
                          }}
                        />
                        <Chip
                          label={application.event.ong.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: "medium",
                          }}
                        />
                      </Box>

                      <Stack spacing={1.5} mb={2} width="100%">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" color="text.primary">
                            ⏰ Tempo restante para avaliar:{" "}
                            {formatHoursRemaining(application.hoursRemaining)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" color="text.primary">
                            ✓ Check-in realizado em{" "}
                            {formatCheckInDate(application.checkInAt)}
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      <Box
                        sx={{
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 152, 0, 0.15)"
                              : "rgba(255, 152, 0, 0.08)",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="medium"
                          color="text.primary"
                          sx={{ mb: 2 }}
                        >
                          Você participou deste evento! Que tal compartilhar sua
                          experiência?
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            bgcolor: theme.palette.warning.main,
                            color: "white",
                            borderRadius: 2,
                            py: 1.5,
                            fontWeight: "bold",
                            "&:hover": {
                              bgcolor: theme.palette.warning.dark,
                            },
                          }}
                          startIcon={<Star size={20} />}
                          onClick={() => handleOpenReviewModal(application)}
                        >
                          Avaliar Evento
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      <Box mb={0}>
        <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
          Suas Inscrições
        </Typography>
      </Box>

      <Stack spacing={3} width="100%">
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
            <Typography color="text.primary">
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
                          <Typography variant="body2" color="text.primary">
                            Você fez check-in com sucesso
                          </Typography>
                          {event.checkInAt && (
                            <Typography
                              variant="caption"
                              color="text.primary"
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
                            color="text.primary"
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
                            {loadingCheckIn[event.eventId]
                              ? "Verificando..."
                              : "Fazer Check-in"}
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

      <Dialog
        open={reviewModalOpen}
        onClose={handleCloseReviewModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Star
                size={24}
                color={theme.palette.warning.main}
                fill={theme.palette.warning.main}
              />
              <Typography variant="h6" fontWeight="bold">
                Avaliar Evento
              </Typography>
            </Box>
            <IconButton onClick={handleCloseReviewModal} size="small">
              <X size={20} />
            </IconButton>
          </Box>
          {selectedApplication && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {selectedApplication.event.title}
            </Typography>
          )}
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          {reviewSuccess ? (
            <Box textAlign="center" py={3}>
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
                mb={1}
              >
                Avaliação Enviada!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Obrigado por compartilhar sua experiência
              </Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              {reviewError && (
                <Alert severity="error" onClose={() => setReviewError("")}>
                  {reviewError}
                </Alert>
              )}

              <Box>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color="text.primary"
                  mb={2}
                  textAlign="center"
                >
                  Como foi sua experiência?
                </Typography>
                <Box display="flex" justifyContent="center">
                  <Rating
                    value={rating}
                    onChange={(_, newValue) => {
                      setRating(newValue);
                      setReviewError("");
                    }}
                    size="large"
                    sx={{
                      fontSize: "3rem",
                      "& .MuiRating-iconEmpty": {
                        color: theme.palette.action.disabled,
                      },
                      "& .MuiRating-iconFilled": {
                        color: theme.palette.warning.main,
                      },
                      "& .MuiRating-iconHover": {
                        color: theme.palette.warning.dark,
                      },
                    }}
                  />
                </Box>
                {rating !== null && rating > 0 && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    textAlign="center"
                    display="block"
                    mt={1}
                  >
                    {rating === 1 && "Muito Insatisfeito"}
                    {rating === 2 && "Insatisfeito"}
                    {rating === 3 && "Regular"}
                    {rating === 4 && "Satisfeito"}
                    {rating === 5 && "Muito Satisfeito"}
                  </Typography>
                )}
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  color="text.primary"
                  mb={1}
                >
                  Comentário (opcional)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Compartilhe sua experiência com a ONG e o evento..."
                  value={comment}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setComment(e.target.value);
                    }
                  }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  {comment.length} / 500 caracteres
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>

        {!reviewSuccess && (
          <>
            <Divider />
            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Button
                onClick={handleCloseReviewModal}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "medium",
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitReview}
                variant="contained"
                disabled={!rating || rating === 0 || isCreatingReview}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  bgcolor: theme.palette.warning.main,
                  "&:hover": {
                    bgcolor: theme.palette.warning.dark,
                  },
                }}
              >
                {isCreatingReview ? "Enviando..." : "Enviar Avaliação"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
