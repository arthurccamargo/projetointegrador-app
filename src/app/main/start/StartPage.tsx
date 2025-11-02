import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { HeartHandshake } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useAuth } from "../../auth/useAuth";
import LoadingSpinner from "../../shared-components/LoadingSpinner";

function StartPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, isLoading } = useAuth();

  // Redireciona se já estiver logado
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "ONG") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  // Mostra LoadingSpinner enquanto verifica autenticação
  if (isLoading) {
    return (
      <LoadingSpinner 
        text="Verificando sessão..." 
        fullScreen={true}
        size={50}
      />
    );
  }

  // Se já estiver autenticado, não renderiza nada (vai redirecionar)
  if (user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: theme.palette.secondary.main,
        background: "linear-gradient(135deg, #faffb4ff 0%, #ecf297ff' 100%)",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: 400, md: 450 },
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          mb: 30 
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          sx={{ mb: 3 }}
        >
          HelpHub
        </Typography>
        <HeartHandshake />
        <Typography
          variant="subtitle1"
          color="text"
          align="center"
          sx={{ mb: 4, mt: 4, width: "100%", fontFamily: '"BBH Sans Bartle", serif' }}
        >
          Onde a ajuda encontra o caminho.
        </Typography>
      </Box>
      
      <Box
        sx={{
          width: { xs: "90%", sm: 400, md: 450 },
          maxWidth: 500,
          mb: 4
        }}
      >
        <Stack spacing={2} width="100%">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 30,
              py: 1.8,
              fontSize: "1.1rem",
              fontWeight: "bold"
            }}
            fullWidth
            onClick={() => navigate("/sign-up")}
          >
            Cadastrar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              borderRadius: 30,
              py: 1.8,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderWidth: 1,  
            }}
            fullWidth
            onClick={() => navigate("/sign-in")}
          >
            Entrar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default StartPage;
