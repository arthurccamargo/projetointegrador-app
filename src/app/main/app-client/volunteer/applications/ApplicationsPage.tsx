import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Stack, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  useCancelMutation,
  useGetAllApplicationsByVolunteerQuery,
} from "../../../../api/EventApplicationApi";
import type { EventApplication } from "../../../../../types/event-applications.type";
import ApplicationCard from "./components/ApplicationCard";
import ConfirmModal from "../../../../shared-components/ConfirmModal";

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [applicationSelected, setApplicationSelected] =
    useState<EventApplication | null>(null);
  const [cancel, { isLoading: isLoadingCancel }] = useCancelMutation();
  const { data: applications = [], isLoading: isLoadingApplications } =
    useGetAllApplicationsByVolunteerQuery();

  const filteredEvents = applications.filter(
    (application: { event: { title: string; category: { name: string } } }) =>
      application.event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.event.category?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleCancelClick = (application: EventApplication) => {
    setApplicationSelected(application);
    setOpenModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!applicationSelected) return;
    try {
      await cancel({ id: applicationSelected.id }).unwrap();
      setOpenModal(false);
    } catch (error) {
      console.error("Error cancelling application:", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 2, minHeight: "100vh", position: "relative", mb: 2 }}
    >
      <Box mb={8}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={2}>
          Minhas Candidaturas
        </Typography>
        <Typography color="text.common.black" mb={3}>
          Acompanhe suas candidaturas e atividades
        </Typography>
        <Box maxWidth={400}>
          <TextField
            fullWidth
            variant="outlined"
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

      <Stack spacing={3}>
        {isLoadingApplications ? (
          <Typography>Carregando candidaturas...</Typography>
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
          <Typography color="text.secondary">
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

    </Container>
  );
}
