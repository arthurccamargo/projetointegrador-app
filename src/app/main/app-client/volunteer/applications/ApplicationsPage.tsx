import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  useCancelMutation,
  useGetAllActiveApplicationsByVolunteerQuery,
} from "../../../../api/EventApplicationApi";
import type { EventApplication } from "../../../../../types/event-applications.type";
import ApplicationCard from "./components/ApplicationCard";
import ConfirmModal from "../../../../shared-components/ConfirmModal";
import { useTheme } from '@mui/material/styles';


export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [applicationSelected, setApplicationSelected] =
    useState<EventApplication | null>(null);
  const [cancel, { isLoading: isLoadingCancel }] = useCancelMutation();
  const { data: applications = [], isLoading: isLoadingApplications, refetch } =
    useGetAllActiveApplicationsByVolunteerQuery();

  const filteredEvents = applications.filter(
    (application: EventApplication) =>
      application.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelClick = (application: EventApplication) => {
    setApplicationSelected(application);
    setOpenModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!applicationSelected) return;
    try {
      await cancel({ id: applicationSelected.applicationId }).unwrap();
      await refetch();
      setOpenModal(false);
      setApplicationSelected(null);
    } catch (error: any) {
      console.error("Erro ao cancelar candidatura:", error);
      throw error;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        px: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 12, md: 4 },
        pt: 2,
      }}
    >
      <Box mb={4} width="100%" maxWidth="400px" color={ theme.palette.text.primary }>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1}>
          Minhas Candidaturas
        </Typography>
        <Typography mb={3}>
          Acompanhe suas candidaturas e atividades
        </Typography>
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            sx={{ 
              '& .MuiOutlinedInput-root': {
              borderRadius: 5 
              }
            }}
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                  <Search size={20} style={{ color: "#9ca3af" }} />
                </Box>
              ),
            }}
            size="small"
          />
        </Box>
      </Box>

      <Stack spacing={3} width="100%">
        {isLoadingApplications ? (
          <Typography sx={{ color: "text.primary" }}>Carregando candidaturas...</Typography>
        ) : (
          filteredEvents.map((application: EventApplication) => (
            <ApplicationCard key={application.id} application={application} onCancel={async () => handleCancelClick(application)} />
          ))
        )}
      </Stack>

      {!isLoadingApplications && filteredEvents.length === 0 && (
        <Box textAlign="center" mt={8}>
          <Typography
            variant="h6"
            fontWeight="medium"
            color="text.primary"
            mb={1}
          >
            Nenhuma candidatura encontrada
          </Typography>
          <Typography color={ theme.palette.text.primary }>
            Tente buscar com outros termos ou crie uma nova candidatura
          </Typography>
        </Box>
      )}

      <ConfirmModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setApplicationSelected(null);
        }}
        onConfirm={handleConfirmCancel}
        loading={isLoadingCancel}
        title="Cancelar Candidatura"
        color="error"
        message="Tem certeza que deseja cancelar esta candidatura?"
      />

    </Box>
  );
}
