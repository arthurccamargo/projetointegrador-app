import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Stack, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useState } from "react";
import type { Event } from "../../../../../types/events.type";
import { useGetAllEventsQuery } from "../../../../api/EventApi";
import EventCardToVolunteer from "./components/EventCardToVolunteer";
import ConfirmModal from "../../../../shared-components/ConfirmModal";
import { useApplyMutation } from "../../../../api/EventApplicationApi";
import { useTheme } from '@mui/material/styles';


export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [eventSelected, setEventSelected] = useState<Event | null>(null);
  const [applyToEvent, { isLoading: isLoadingApply }] = useApplyMutation();
  const { data: events = [], isLoading: isLoadingEvents, refetch } =
    useGetAllEventsQuery();

  const filteredEvents = events.filter(
    (event: Event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyClick = (event: Event) => {
    setEventSelected(event);
    setOpenModal(true);
  };

  const handleConfirmApply = async () => {
    if (!eventSelected) return;
    try {
      await applyToEvent({ eventId: eventSelected.id }).unwrap();
      await refetch();
      setOpenModal(false);
      setEventSelected(null);
    } catch (error: any) {
      console.error("Erro ao se candidatar:", error);
      throw error;
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 2, minHeight: "100vh", position: "relative", mb: 2, bgcolor: theme.palette.background.default }}
    >
      <Box mb={8} color={ theme.palette.text.primary }>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Buscar Oportunidades
        </Typography>
        <Typography mb={3}>
          Encontre oportunidades para fazer a diferença
        </Typography>
        <Box maxWidth={400}>
          <TextField
            fullWidth
            sx={{ 
              '& .MuiOutlinedInput-root': {
              borderRadius: 5 
              }
            }}
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
        {isLoadingEvents ? (
          <Typography>Carregando eventos...</Typography>
        ) : (
          filteredEvents.map((event: Event) => (
            <EventCardToVolunteer
              key={event.id}
              event={event}
              onApplyClick={async () => handleApplyClick(event)}
            />
          ))
        )}
      </Stack>

      {!isLoadingEvents && filteredEvents.length === 0 && (
        <Box textAlign="center" mt={8}>
          <Typography
            variant="h6"
            fontWeight="medium"
            color="text.primary"
            mb={1}
          >
            Nenhum evento encontrado.
          </Typography>
        </Box>
      )}

      <ConfirmModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEventSelected(null);
        }}
        onConfirm={handleConfirmApply}
        title="Confirmar Candidatura"
        message={`Tem certeza que deseja se candidatar ao evento "${eventSelected?.title}"? Você pode cancelar sua candidatura até 48 horas antes do evento.`}
        color="success"
        loading={isLoadingApply}
      />
    </Container>
  );
}
