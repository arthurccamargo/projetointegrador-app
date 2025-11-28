import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import type { Event } from "../../../../../types/events.type";
import { useGetAllEventsQuery } from "../../../../api/EventApi";
import EventCardToVolunteer from "./components/EventCardToVolunteer";
import ConfirmModal from "../../../../shared-components/ConfirmModal";
import { useApplyMutation } from "../../../../api/EventApplicationApi";
import { useTheme } from "@mui/material/styles";
import { useGetCategoriesQuery } from "../../../../api/CategoryApi";
import CategoryFilter from "./components/CategoryFilter";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const theme = useTheme();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [eventSelected, setEventSelected] = useState<Event | null>(null);
  const [applyToEvent, { isLoading: isLoadingApply }] = useApplyMutation();
  const {
    data: events = [],
    isLoading: isLoadingEvents,
    refetch,
  } = useGetAllEventsQuery();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(
        (event: Event) => event.categoryId === selectedCategory
      );
    }

    // Filtro por busca (título ou categoria)
    if (searchTerm) {
      filtered = filtered.filter(
        (event: Event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [events, selectedCategory, searchTerm]);

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
    } catch (error: unknown) {
      console.error("Erro ao se candidatar:", error);
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
      <Box
        mb={4}
        width="100%"
        color={theme.palette.text.primary}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Buscar Oportunidades
        </Typography>
        <Typography mb={3}>
          Encontre oportunidades para fazer a diferença
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          <TextField
            sx={{
              minWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: 5,
              },
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

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isLoading={isLoadingCategories}
          />
        </Box>
      </Box>

      <Stack spacing={3} width="100%">
        {isLoadingEvents ? (
          <Typography sx={{ color: "text.primary" }}>
            Carregando eventos...
          </Typography>
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
    </Box>
  );
}
