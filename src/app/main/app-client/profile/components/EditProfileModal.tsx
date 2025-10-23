import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { X } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../../../auth/useAuth";
import type { User } from "../../../../auth/auth.type";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export default function EditProfileModal({
  open,
  onClose,
  user,
}: EditProfileModalProps) {
  const theme = useTheme();
  const { updateUser } = useAuth();

  // Estados para os campos editáveis
  const [fullName, setFullName] = useState(
    user.role === "VOLUNTEER" ? user.volunteerProfile?.fullName || "" : user.ongProfile?.name || ""
  );
  const [phone, setPhone] = useState(
    user.role === "VOLUNTEER" ? user.volunteerProfile?.phone || "" : ""
  );
  const [experiences, setExperiences] = useState(
    user.role === "VOLUNTEER" ? user.volunteerProfile?.experiences || "" : ""
  );
  const [description, setDescription] = useState(
    user.role === "ONG" ? user.ongProfile?.description || "" : ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Pega o token do sessionStorage
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado para editar o perfil");
        return;
      }

      // URL base da API
      const BASEAPI_URL = import.meta.env.VITE_BASE_API_URL;

      // Define a rota e o body de acordo com o role
      const endpoint = user.role === "VOLUNTEER" 
        ? `${BASEAPI_URL}/users/volunteer/${user.id}`
        : `${BASEAPI_URL}/users/ong/${user.id}`;

      const body = user.role === "VOLUNTEER"
        ? { fullName, phone, experiences }
        : { name: fullName, description };

      // Faz a requisição PATCH
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar perfil");
      }

      const updatedProfile = await response.json();
      console.log("Perfil atualizado:", updatedProfile);

      // Atualizar o contexto de autenticação com os novos dados
      if (user.role === "VOLUNTEER") {
        updateUser({
          volunteerProfile: updatedProfile,
        });
      } else {
        updateUser({
          ongProfile: updatedProfile,
        });
      }

    //   alert("Perfil atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(error instanceof Error ? error.message : "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
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
              color: theme.palette.primary.main,
            }}
          >
            Editar perfil
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={24} color={theme.palette.primary.main} />
          </IconButton>
        </Box>

        <Divider />

        {/* Form */}
        <Box sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Nome / Nome da ONG */}
            <TextField
              label={user.role === "VOLUNTEER" ? "Nome completo" : "Nome da organização"}
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* Email (não editável) */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={user.email}
              disabled
              helperText="O email não pode ser alterado"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* Campos específicos para VOLUNTÁRIO */}
            {user.role === "VOLUNTEER" && (
              <>
                <TextField
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  label="Experiências"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={experiences}
                  onChange={(e) => setExperiences(e.target.value)}
                  placeholder="Conte um pouco sobre suas experiências..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </>
            )}

            {/* Campos específicos para ONG */}
            {user.role === "ONG" && (
              <TextField
                label="Descrição"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da organização..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          </Stack>
        </Box>

        <Divider />

        {/* Footer com botões */}
        <Box sx={{ p: 3, pt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={onClose}
              sx={{
                borderRadius: 2,
                py: 1.2,
                fontWeight: "bold",
                textTransform: "none",
                borderColor: "#dbdbdb",
                color: theme.palette.text.primary,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  bgcolor: "transparent",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSave}
              disabled={loading}
              sx={{
                borderRadius: 2,
                py: 1.2,
                fontWeight: "bold",
                textTransform: "none",
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
