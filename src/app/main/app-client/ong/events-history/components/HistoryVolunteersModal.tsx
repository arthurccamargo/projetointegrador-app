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
} from "@mui/material";
import { X, User } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import type { Application } from "../../../../../../types/events.type";

interface HistoryVolunteersModalProps {
  open: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
  applications: Application[];
}

export default function ViewCandidatesModal({
  open,
  onClose,
  eventTitle,
  applications,
}: HistoryVolunteersModalProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
    onClose();
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
              Participantes do Evento
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
          {applications.length === 0 && (
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
                Nenhum participante encontrado para este evento.
              </Typography>
            </Box>
          )}

          {applications.length > 0 && (
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
                Total: {applications.length}{" "}
                {applications.length === 1 ? "participante" : "participantes"}
              </Typography>

              <List sx={{ p: 0 }}>
                {applications.map((application, index) => (
                  <Box key={application.id}>
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
                            handleViewProfile(application.volunteer.userId)
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
                            primary={application.volunteer.fullName}
                            secondary={`Status: ${getStatusLabel(application.status)}`}
                            primaryTypographyProps={{
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                            }}
                            secondaryTypographyProps={{
                              sx: {
                                color: getStatusColor(application.status),
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
                      </Box>
                    </ListItem>
                    {index < applications.length - 1 && (
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
