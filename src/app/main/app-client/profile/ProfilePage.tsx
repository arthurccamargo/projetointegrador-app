import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../auth/useAuth";


export default function ProfilePage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <div>Usuário não autenticado</div>;
    }

    return (
        <Box
        sx={{
            backgroundColor: "green",
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
        </Box>
  );
}
