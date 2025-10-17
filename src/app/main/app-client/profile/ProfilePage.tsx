import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../../auth/useAuth";
import { useTheme } from '@mui/material/styles';
import { Settings, LogOut, Trash2, Camera } from "lucide-react";

export default function ProfilePage() {
    const { user, isLoading, signOut } = useAuth();
    const theme = useTheme();

    if (isLoading) {
        return (
            <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default 
            }}>
                <Typography variant="h6">Carregando...</Typography>
            </Box>
        );
    }

    if (!user) {
        return (
            <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                minHeight: "100vh",
                backgroundColor: theme.palette.background.paper 
            }}>
                <Typography variant="h6">Usuário não autenticado</Typography>
            </Box>
        );
    }

    const displayName = user.role === "VOLUNTEER" 
        ? user.volunteerProfile?.fullName 
        : user.ongProfile?.name;

    const getInitials = (name: string | undefined) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.paper,
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pb: { xs: 12, md: 4 },
            }}
        >
            {/* Header com Settings Icon */}
            <Box 
                sx={{ 
                    width: "100%", 
                    maxWidth: 600,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    pt: 3,
                    pb: 2
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                    }}
                >
                    Meu perfil
                </Typography>
                <IconButton>
                    <Settings size={24} color={theme.palette.primary.main} />
                </IconButton>
            </Box>

            {/* Profile Section - Instagram Style */}
            <Box 
                sx={{ 
                    width: "100%", 
                    maxWidth: 600,
                    px: 3,
                    mb: 3
                }}
            >
                {/* Avatar e Info Principal */}
                <Stack 
                    direction="row" 
                    spacing={3}
                    alignItems="center"
                    sx={{ mb: 3 }}
                >
                    {/* Avatar com botão de câmera */}
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            sx={{
                                width: { xs: 90, sm: 110 },
                                height: { xs: 90, sm: 110 },
                                bgcolor: theme.palette.primary.main,
                                fontSize: "2rem",
                                fontWeight: "bold"
                            }}
                        >
                            {getInitials(displayName)}
                        </Avatar>
                        <IconButton
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                bgcolor: theme.palette.primary.main,
                                width: 32,
                                height: 32,
                                "&:hover": {
                                    bgcolor: theme.palette.primary.dark,
                                }
                            }}
                        >
                            <Camera size={16} color="#fff" />
                        </IconButton>
                    </Box>

                    {/* Stats (pode personalizar depois) */}
                    <Stack 
                        direction="row" 
                        spacing={4}
                        sx={{ flex: 1, justifyContent: "center" }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <Typography 
                                variant="h6" 
                                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                            >
                                {user.role === "VOLUNTEER" ? "0" : "0"}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                {user.role === "VOLUNTEER" ? "participações" : "eventos criados"}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography 
                                variant="h6" 
                                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                            >
                                {user.status === "ACTIVE" ? "Ativo" : "Pendente"}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                status
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>

                {/* Nome e Bio */}
                <Box sx={{ mb: 2 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: "bold",
                            color: theme.palette.primary.main,
                            mb: 0.5
                        }}
                    >
                        {displayName || "Usuário"}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: theme.palette.text.primary, 
                            opacity: 0.8,
                            mb: 1
                        }}
                    >
                        {user.email}
                    </Typography>
                    {user.role === "VOLUNTEER" && user.volunteerProfile?.phone && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: theme.palette.text.primary, 
                                opacity: 0.8
                            }}
                        >
                            {user.volunteerProfile.phone}
                        </Typography>
                    )}
                    {user.role === "VOLUNTEER" && user.volunteerProfile?.experiences && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: theme.palette.text.primary, 
                                opacity: 0.8,
                                mt: 1
                            }}
                        >
                            {user.volunteerProfile.experiences}
                        </Typography>
                    )}
                    {user.role === "ONG" && user.ongProfile?.description && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: theme.palette.text.primary, 
                                opacity: 0.8,
                                mt: 1
                            }}
                        >
                            {user.ongProfile.description}
                        </Typography>
                    )}
                </Box>

                {/* Botão de Editar Perfil */}
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderRadius: 15,
                        py: 1,
                        fontWeight: "bold",
                        textTransform: "none",
                        borderColor: "#dbdbdb",
                        color: theme.palette.primary.main,
                        "&:hover": {
                            borderColor: theme.palette.primary.main,
                            bgcolor: "transparent",
                        }
                    }}
                >
                    Editar perfil
                </Button>
            </Box>

            <Divider sx={{ width: "100%", mb: 3 }} />

            {/* Informações Adicionais */}
            <Box 
                sx={{ 
                    width: "100%", 
                    maxWidth: 600,
                    px: 3,
                    mb: 4
                }}
            >
                <Typography 
                    variant="subtitle2" 
                    sx={{ 
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        mb: 2,
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: 1
                    }}
                >
                    Informações da conta
                </Typography>

                <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Tipo de conta
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {user.role === "VOLUNTEER" ? "Voluntário" : "Organização"}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Membro desde
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </Typography>
                    </Box>

                    {user.role === "VOLUNTEER" && user.volunteerProfile?.city && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                Localização
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {user.volunteerProfile.city}, {user.volunteerProfile.state}
                            </Typography>
                        </Box>
                    )}

                    {user.role === "ONG" && user.ongProfile?.city && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                Localização
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {user.ongProfile.city}, {user.ongProfile.state}
                            </Typography>
                        </Box>
                    )}

                    {user.role === "ONG" && user.ongProfile?.responsibleName && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                Responsável
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {user.ongProfile.responsibleName}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Box>

            <Divider sx={{ width: "100%", mb: 3 }} />

            {/* Seção de Ações Perigosas */}
            <Box 
                sx={{ 
                    width: "100%", 
                    maxWidth: 600,
                    px: 3,
                }}
            >
                <Typography 
                    variant="subtitle2" 
                    sx={{ 
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        mb: 2,
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: 1
                    }}
                >
                    Configurações da conta
                </Typography>

                <Stack spacing={2}>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<LogOut size={20} />}
                        sx={{
                            borderRadius: 15,
                            py: 1.5,
                            fontWeight: "bold",
                            textTransform: "none",
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            "&:hover": {
                                borderColor: theme.palette.primary.main,
                                bgcolor: "rgba(34, 34, 59, 0.04)",
                            }
                        }}
                        onClick={() => signOut()}
                    >
                        Sair da conta
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Trash2 size={20} />}
                        sx={{
                            borderRadius: 15,
                            py: 1.5,
                            fontWeight: "bold",
                            textTransform: "none",
                            borderColor: theme.palette.error.main,
                            color: theme.palette.error.main,
                            "&:hover": {
                                borderColor: theme.palette.error.dark,
                                bgcolor: "rgba(244, 67, 54, 0.04)",
                            }
                        }}
                        // onClick={() => {/* TODO: implementar exclusão de conta */}}
                    >
                        Excluir conta
                    </Button>
                </Stack>
            </Box>

            {/* Espaço extra no final */}
            <Box sx={{ height: 40 }} />
        </Box>
    );
}
