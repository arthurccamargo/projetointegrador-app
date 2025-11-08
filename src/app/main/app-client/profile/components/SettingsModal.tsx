import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { X, Moon, Sun } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../../../../../theme/useThemeMode";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  const isDarkMode = mode === 'dark';

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
          maxWidth: 500,
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            Configurações
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={24} color={theme.palette.text.primary} />
          </IconButton>
        </Box>

        <Divider />

        {/* Conteúdo */}
        <Box sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Seção de Aparência */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                  opacity: 0.7,
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                }}
              >
                Aparência
              </Typography>

              {/* Toggle Modo Escuro */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(0, 0, 0, 0.02)',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.03)',
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: isDarkMode 
                        ? 'rgba(144, 202, 249, 0.1)' 
                        : 'rgba(25, 118, 210, 0.08)',
                    }}
                  >
                    {isDarkMode ? (
                      <Moon size={20} color={theme.palette.secondary.main} />
                    ) : (
                      <Sun size={20} color={theme.palette.primary.main} />
                    )}
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Modo escuro
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        opacity: 0.6,
                        fontSize: "0.875rem",
                      }}
                    >
                      {isDarkMode ? "Ativado" : "Desativado"}
                    </Typography>
                  </Box>
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={isDarkMode}
                      onChange={toggleTheme}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: theme.palette.text.primary,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: theme.palette.text.primary,
                        },
                      }}
                    />
                  }
                  label=""
                  sx={{ m: 0 }}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
