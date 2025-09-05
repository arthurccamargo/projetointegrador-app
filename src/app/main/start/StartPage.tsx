import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { HeartHandshake } from 'lucide-react';

function StartPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: 3,
          p: 5,
          width: 350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={{ mb: 3 }}
        >
          HELPHUB
        </Typography>
        <HeartHandshake />
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="center"
          sx={{ mb: 4 }}
        >
          Bem-vindo ao HELPHUB! Escolha uma opção para continuar.
        </Typography>
        <Stack spacing={2} width="100%">
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={() => navigate("/sign-up")}
          >
            Cadastrar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
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
