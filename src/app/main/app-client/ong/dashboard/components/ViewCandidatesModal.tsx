import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { X, User, UserX } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const BASEAPI_URL = import.meta.env.VITE_BASE_API_URL;

interface Candidate {
  id: string;
  status: string;
  createdAt: string;
  volunteer: {
    userId: string;
    fullName: string;
  };
}

interface ViewCandidatesModalProps {
  open: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export default function ViewCandidatesModal({
  open,
  onClose,
  eventId,
  eventTitle,
}: ViewCandidatesModalProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      console.log("Fetching candidates for event:", eventId);
      console.log("Token exists:", !!token);

      const response = await fetch(
        `${BASEAPI_URL}/applications/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Candidates received:", data);
      setCandidates(data);
    } catch (err) {
      console.error("Erro ao carregar candidatos:", err);
      setError(
        err instanceof Error ? err.message : "Erro ao carregar candidatos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && eventId) {
      fetchCandidates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, eventId]);

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
    onClose();
  };

  const handleReject = async (applicationId: string) => {
    if (!confirm("Tem certeza que deseja rejeitar esta candidatura?")) {
      return;
    }

    setRejectingId(applicationId);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const response = await fetch(
        `${BASEAPI_URL}/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "REJECTED" }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      // Atualiza o status localmente sem refazer a requisição
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === applicationId
            ? { ...candidate, status: "REJECTED" }
            : candidate
        )
      );
    } catch (err) {
      console.error("Erro ao rejeitar candidatura:", err);
      alert(
        err instanceof Error ? err.message : "Erro ao rejeitar candidatura"
      );
    } finally {
      setRejectingId(null);
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "Pendente",
      ACCEPTED: "Aceito",
      REJECTED: "Rejeitado",
      CANCELLED: "Cancelado",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      PENDING: theme.palette.warning.main,
      ACCEPTED: theme.palette.success.main,
      REJECTED: theme.palette.error.main,
      CANCELLED: theme.palette.text.secondary,
    };
    return colorMap[status] || theme.palette.text.primary;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 4,
          boxShadow: 24,
          width: "90%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflow: "auto",
          p: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            pb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              Candidatos do Evento
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                opacity: 0.7,
                mt: 0.5,
              }}
            >
              {eventTitle}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <X size={24} color={theme.palette.primary.main} />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 4,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && candidates.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  opacity: 0.7,
                }}
              >
                Nenhum candidato encontrado para este evento.
              </Typography>
            </Box>
          )}

          {!loading && !error && candidates.length > 0 && (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                  opacity: 0.7,
                }}
              >
                Total: {candidates.length}{" "}
                {candidates.length === 1 ? "candidato" : "candidatos"}
              </Typography>

              <List sx={{ p: 0 }}>
                {candidates.map((candidate, index) => (
                  <Box key={candidate.id}>
                    <ListItem
                      disablePadding
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.03)"
                              : "rgba(0, 0, 0, 0.02)",
                          border: `1px solid ${theme.palette.divider}`,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ListItemButton
                          onClick={() =>
                            handleViewProfile(candidate.volunteer.userId)
                          }
                          sx={{
                            borderRadius: 2,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.08)"
                                  : "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(144, 202, 249, 0.1)"
                                  : "rgba(25, 118, 210, 0.08)",
                              mr: 2,
                            }}
                          >
                            <User
                              size={20}
                              color={theme.palette.primary.main}
                            />
                          </Box>

                          <ListItemText
                            primary={candidate.volunteer.fullName}
                            secondary={`Status: ${getStatusLabel(candidate.status)}`}
                            primaryTypographyProps={{
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                            }}
                            secondaryTypographyProps={{
                              sx: {
                                color: getStatusColor(candidate.status),
                                fontWeight: 500,
                                fontSize: "0.875rem",
                              },
                            }}
                          />

                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 600,
                              fontSize: "0.875rem",
                            }}
                          >
                            Ver perfil →
                          </Typography>
                        </ListItemButton>

                        {/* Botão Rejeitar */}
                        {candidate.status !== "REJECTED" && candidate.status !== "CANCELLED" && (
                          <Box
                            sx={{
                              px: 2,
                              pb: 2,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<UserX size={16} />}
                              disabled={rejectingId === candidate.id}
                              onClick={() => handleReject(candidate.id)}
                              sx={{
                                textTransform: "none",
                                fontWeight: 600,
                              }}
                            >
                              {rejectingId === candidate.id
                                ? "Rejeitando..."
                                : "Rejeitar"}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </ListItem>
                    {index < candidates.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
