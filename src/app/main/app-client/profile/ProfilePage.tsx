import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../../../auth/useAuth";
import { useTheme } from '@mui/material/styles';

export default function ProfilePage() {
    const { user, isLoading, signOut } = useAuth();
    const theme = useTheme();

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
            justifyContent: "flex-start",
            alignItems: "center",
            p: 3,
            pt: 2,
            m: 0,
            minHeight: "100vh",
            minWidth: "100%",
            boxSizing: "border-box",
            overflow: "auto",
        }}
        >
        <Typography variant="h3" sx={{ mt: 4, mb: 8, mr: 32 }}>Perfil</Typography>
        <Typography variant="body1">
            <div>
                <p>Name: {user.volunteerProfile?.fullName}</p>
                <p>Email: {user.email}</p>
                <p>Telefone: {user.volunteerProfile?.phone}</p>
                <p>Role: {user.role}</p>
            </div>
        </Typography>

        <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              borderRadius: 30,
              mt: 40,
              py: 1.8,
              px: 4,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderWidth: 1,
              minWidth: 200,
              maxWidth: 400,
            }}
            onClick={() => signOut()}
          >
            Log out
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              borderRadius: 30,
              py: 1.8,
              px: 4,
              mt: 1,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderWidth: 1,
              minWidth: 200,
              maxWidth: 400,
            }}
            // onClick={() => }
          >
            Excluir conta
          </Button>
        </Box>

        
  );
}
