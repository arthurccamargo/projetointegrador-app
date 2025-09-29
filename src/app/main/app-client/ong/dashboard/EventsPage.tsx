import { useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  useCreateEventMutation,
  useGetEventsByOngIdQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from "../../../../api/EventApi";
import {
  Container,
  Box,
  Typography,
  TextField,
  Fab,
  Stack,
} from "@mui/material";
import EventCard from "./components/EventCard";
import CreateEventModal from "./components/CreateEventModal";
import type { Event } from "../../../../../types/events.type";
import type { CreateEventPayload } from "./components/CreateEventModal";
import ConfirmModal from "../../../../shared-components/ConfirmModal";
import EditEventModal from "./components/EditEventModal";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState<null | "create" | "edit" | "delete">(null);
  const [eventSelected, setEventSelected] = useState<Event | null>(null);
  const [createEvent] = useCreateEventMutation();
  const [deleteEvent, { isLoading: isLoadingDelete }] = useDeleteEventMutation();
  const [updateEvent, { isLoading: isLoadingUpdate }] = useUpdateEventMutation();
  const { data: events = [], isLoading: isLoadingEvents } = useGetEventsByOngIdQuery();

  const filteredEvents = events.filter(
    (event: Event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEvent = async (formData: CreateEventPayload) => {
    try {
      await createEvent({ dto: formData }).unwrap();
      setOpenModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (event: Event) => {
    setEventSelected(event);
    setOpenModal("delete");
  };

  const handleConfirmDelete = async () => {
    if (!eventSelected) return;
    try {
      await deleteEvent({ id: eventSelected.id }).unwrap();
      setOpenModal(null);
      setEventSelected(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (event: Event) => {
    setEventSelected(event);
    setOpenModal("edit");
  };

  const handleConfirmEdit = async (formData: Partial<Event>) => {
    if (!eventSelected) return;
    try {
      await updateEvent({ id: eventSelected.id, dto: formData }).unwrap();
      setOpenModal(null);
      setEventSelected(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 2, minHeight: "100vh", position: "relative", mb: 2 }}
    >
      <Box mb={8}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={2}>
          Meus Eventos
        </Typography>
        <Typography color="text.common.black" mb={3}>
          Gerencie seus eventos e candidatos
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
        {isLoadingEvents ? (
          <Typography>Carregando eventos...</Typography>
        ) : (
          filteredEvents.map((event: Event) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={async () => handleDeleteClick(event)}
              onEdit={async () => handleEditClick(event)}
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
            Nenhum evento encontrado
          </Typography>
          <Typography color="text.secondary">
            Tente buscar com outros termos ou crie um novo evento
          </Typography>
        </Box>
      )}

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          width: 56,
          height: 56,
          zIndex: 1000,
        }}
        onClick={() => setOpenModal("create")}
      >
        <Plus size={28} />
      </Fab>

      <CreateEventModal
        open={openModal === "create"}
        onClose={() => setOpenModal(null)}
        onCreate={handleCreateEvent}
      />

      <ConfirmModal
        open={openModal === "delete"}
        onClose={() => {
          setOpenModal(null);
          setEventSelected(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Excluir Evento"
        message={`Tem certeza que deseja excluir o evento "${eventSelected?.title}"? Essa ação não pode ser desfeita.`}
        color="error"
        loading={isLoadingDelete}
      />

      <EditEventModal
        open={openModal === "edit"}
        onClose={() => {
          setOpenModal(null);
          setEventSelected(null);
        }}
        onConfirm={handleConfirmEdit}
        event={eventSelected}
        loading={isLoadingUpdate}
      />
    </Container>
  );
}
