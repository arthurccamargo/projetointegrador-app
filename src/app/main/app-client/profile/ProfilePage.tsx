import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../../../auth/useAuth";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <div>Usuário não autenticado</div>;
    }

    return (
        <Box
        sx={{
            backgroundColor: theme.palette.background.default,
            flex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            m: 0,
            minHeight: "100vh",
            minWidth: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
        }}
        >
        <Typography variant="h1">Perfil</Typography>
        <Typography variant="body1">
            <div>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>ID: {user.id}</p>
            </div>
        </Typography>

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
            onClick={() => navigate("/")}
          >
            Log out
          </Button>
        </Box>

        
  );
}
