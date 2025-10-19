import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import type { ReactNode } from "react";
import { Check, Close } from "@mui/icons-material";
import { useState } from "react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: ReactNode;
  color?: "success" | "error" | "info" | "warning";
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  icon,
  color = "info",
  loading = false,
}: ConfirmModalProps) {
  const [error, setError] = useState<string | null>(null);

  const colorMap = {
    success: {
      bg: "bg-green-300",
      border: "border-green-50",
      main: "success.main",
      dark: "success.dark",
    },
    error: {
      bg: "bg-red-300",
      border: "border-red-50",
      main: "error.main",
      dark: "error.dark",
    },
    info: {
      bg: "bg-blue-300",
      border: "border-blue-50",
      main: "info.main",
      dark: "info.dark",
    },
    warning: {
      bg: "bg-yellow-300",
      border: "border-yellow-50",
      main: "warning.main",
      dark: "warning.dark",
    },
  };

  const style = colorMap[color];

  const handleConfirm = async () => {
    try {
      setError(null);
      await onConfirm();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Ocorreu um erro ao processar sua solicitação.";
      setError(errorMessage);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pt: 2,
        }}
      >
        <Box className="flex items-center space-x-2">
          <Box
            className={`${style.bg} rounded-full p-4 border-8 ${style.border} shadow-md`}
            sx={{ transition: "background-color 0.3s ease" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 550 }}>
              {title}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={handleClose}
          sx={{
            minWidth: "auto",
            p: 1,
            color: "#6b7280",
            "&:hover": { backgroundColor: "#f3f4f6" },
          }}
        >
          <Close sx={{ fontSize: 20 }} />
        </Button>
      </DialogTitle>
      <Divider sx={{ mb: 2 }} />
      <DialogContent sx={{ textAlign: "left", pt: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {message}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {loading && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Processando...
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: 4,
                backgroundColor: "#e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: style.main,
                  animation: "loading 1.5s ease-in-out infinite",
                  "@keyframes loading": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </DialogContent>
      <Divider sx={{ my: 2 }} />
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 0,
          justifyContent: "center",
          gap: 2,
          display: "flex",
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={loading}
          sx={{
            flex: 1,
            borderColor: "#d1d5db",
            borderRadius: 2,
            color: "#374151",
            fontWeight: 500,
            backgroundColor: "#fff",
            minWidth: 0,
            "&:hover": { backgroundColor: "#f9fafb" },
          }}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={loading}
          endIcon={icon || <Check sx={{ color: "#fff", fontSize: 20 }} />}
          sx={{
            flex: 1,
            borderRadius: 2,
            fontWeight: 500,
            backgroundColor: style.main,
            color: "#fff",
            minWidth: 0,
            "&:hover": { backgroundColor: style.dark },
            boxShadow: "none",
          }}
        >
          {loading ? "Processando..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
