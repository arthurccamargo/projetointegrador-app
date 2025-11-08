import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../../auth/useAuth";
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from "react-router-dom";
import { Settings, LogOut, Trash2, Camera, ChevronLeft } from "lucide-react";
import EditProfileModal from "./components/EditProfileModal";
import SettingsModal from "./components/SettingsModal";
import type { User } from "../../../auth/auth.type";

const BASEAPI_URL = import.meta.env.VITE_BASE_API_URL;

export default function ProfilePage() {
    const { id } = useParams<{ id?: string }>();
    const { user: currentUser, isLoading: authLoading, signOut } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Determina se é o próprio perfil
    const isOwnProfile = !id || id === currentUser?.id;

    // Carrega o perfil do usuário
    useEffect(() => {
        const loadProfile = async () => {
            // Caso 1: não tem ID na URL, usa o perfil do usuário logado
            if (!id) {
                setProfileUser(currentUser);
                return;
            }

            // Caso 2: o ID é do próprio usuário, usa os dados do contexto
            if (id === currentUser?.id) {
                setProfileUser(currentUser);
                return;
            }

            // Caso 3: ID de outro usuário -> faz requisicao get
            setProfileLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`${BASEAPI_URL}/users/${id}`);
                
                if (!response.ok) {
                    throw new Error('Perfil não encontrado');
                }
                
                const data = await response.json();
                setProfileUser(data);
            } catch (err) {
                console.error('Erro ao carregar perfil:', err);
                setError(err instanceof Error ? err.message : 'Erro ao carregar perfil');
            } finally {
                setProfileLoading(false);
            }
        };

        if (!authLoading) {
            loadProfile();
        }
    }, [id, currentUser, authLoading]);

    // Loading state
    if (authLoading || profileLoading) {
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

    // Error state
    if (error || !profileUser) {
        return (
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center", 
                gap: 2,
                minHeight: "100vh",
                backgroundColor: theme.palette.background.paper 
            }}>
                <Typography variant="h6">
                    {error || 'Perfil não encontrado'}
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </Button>
            </Box>
        );
    }

    const displayName = profileUser.role === "VOLUNTEER" 
        ? profileUser.volunteerProfile?.fullName 
        : profileUser.ongProfile?.name;

    const getInitials = (name: string | undefined) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const backButton = (
        <IconButton
            onClick={() => navigate(-1)}
            disableRipple // remove o efeito ripple ao clicar
            sx={{
                ml: -3,
                "&:hover": {
                    opacity: 0.7, // Remove o fundo cinza no hover
                },
            }}
        >
            <ChevronLeft size={30} color={theme.palette.primary.main} />
            <Typography
                variant="body2"
                sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    fontSize: 18,
                    ml: 0.2,
                }}
            >
                Voltar
            </Typography>
        </IconButton>
    )

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pb: { xs: 12, md: 4 },
            }}
        >
            {/* Header com Settings Icon - só mostra se for próprio perfil */}
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
                        color: theme.palette.text.primary,
                    }}
                >
                    {isOwnProfile ? "Meu perfil" : backButton}
                </Typography>
                {isOwnProfile && (
                <IconButton onClick={() => setOpenSettingsModal(true)}>
                    <Settings size={24} color={theme.palette.text.primary} />
                </IconButton>
                )}
            </Box>

            {/* Profile Section */}
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
                    {/* Avatar - só mostra câmera se for próprio perfil */}
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            sx={{
                                width: { xs: 90, sm: 110 },
                                height: { xs: 90, sm: 110 },
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.secondary.main,
                                fontSize: "2rem",
                                fontWeight: "bold"
                            }}
                        >
                            {getInitials(displayName)}
                        </Avatar>
                        {isOwnProfile && (
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
                        )}
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
                                {profileUser.role === "VOLUNTEER" ? "0" : "0"}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7, color: theme.palette.text.primary }}>
                                {profileUser.role === "VOLUNTEER" ? "participações" : "eventos criados"}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography 
                                variant="h6" 
                                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                            >
                                {profileUser.status === "ACTIVE" ? "Ativo" : "Pendente"}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7, color: theme.palette.text.primary }}>
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
                            color: theme.palette.text.primary,
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
                        {profileUser.email}
                    </Typography>
                    {profileUser.role === "VOLUNTEER" && profileUser.volunteerProfile?.phone && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: theme.palette.text.primary, 
                                opacity: 0.8
                            }}
                        >
                            {profileUser.volunteerProfile.phone}
                        </Typography>
                    )}
                    {profileUser.role === "VOLUNTEER" && profileUser.volunteerProfile?.experiences && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: theme.palette.text.primary, 
                                opacity: 0.8,
                                mt: 1
                            }}
                        >
                            {profileUser.volunteerProfile.experiences}
                        </Typography>
                    )}
                    {profileUser.role === "ONG" && profileUser.ongProfile?.description && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: theme.palette.text.primary, 
                                opacity: 0.8,
                                mt: 1
                            }}
                        >
                            {profileUser.ongProfile.description}
                        </Typography>
                    )}
                </Box>

                {/* Botões de Ação - condicionais */}
                {isOwnProfile && (
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setOpenEditModal(true)}
                        sx={{
                            borderRadius: 15,
                            py: 1,
                            fontWeight: "bold",
                            textTransform: "none",
                            borderColor: "#dbdbdb",
                            color: theme.palette.text.primary,
                            "&:hover": {
                                borderColor: theme.palette.primary.main,
                                bgcolor: "transparent",
                            }
                        }}
                    >
                        Editar perfil
                    </Button>
                )}
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
                        color: theme.palette.text.primary,
                        mb: 2,
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: 1
                    }}
                >
                    {isOwnProfile ? "Informações da conta" : "Informações"}
                </Typography>

                <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", color: theme.palette.text.primary }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Tipo de conta
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {profileUser.role === "VOLUNTEER" ? "Voluntário" : "Organização"}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", color: theme.palette.text.primary }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Membro desde
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {new Date(profileUser.createdAt).toLocaleDateString('pt-BR')}
                        </Typography>
                    </Box>

                    {profileUser.role === "VOLUNTEER" && profileUser.volunteerProfile?.city && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ opacity: 0.7, color: theme.palette.text.primary }}>
                                Localização
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {profileUser.volunteerProfile.city}, {profileUser.volunteerProfile.state}
                            </Typography>
                        </Box>
                    )}

                    {profileUser.role === "ONG" && profileUser.ongProfile?.city && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ opacity: 0.7, color: theme.palette.text.primary }}>
                                Localização
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                                {profileUser.ongProfile.city}, {profileUser.ongProfile.state}
                            </Typography>
                        </Box>
                    )}

                    {profileUser.role === "ONG" && profileUser.ongProfile?.responsibleName && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ opacity: 0.7, color: theme.palette.text.primary }}>
                                Responsável
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                                {profileUser.ongProfile.responsibleName}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Box>

            <Divider sx={{ width: "100%", mb: 3 }} />

            {/* Seção de Ações - só mostra se for próprio perfil */}
            {isOwnProfile && (
                <>
                    <Divider sx={{ width: "100%", mb: 3 }} />
                    
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
                                color: theme.palette.text.primary,
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
                                    borderColor: theme.palette.text.primary,
                                    color: theme.palette.text.primary,
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
                </>
            )}

            {/* Espaço extra no final */}
            <Box sx={{ height: 40 }} />

            {/* Modal de Edição */}
            {isOwnProfile && (
                <EditProfileModal
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    user={profileUser}
                />
            )}

            {/* Modal de Configurações */}
            {isOwnProfile && (
                <SettingsModal
                    open={openSettingsModal}
                    onClose={() => setOpenSettingsModal(false)}
                />
            )}
        </Box>
    );
}
