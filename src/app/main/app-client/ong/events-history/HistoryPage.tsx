import { Container, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Search } from "lucide-react";
import { useGetPastEventsByOngIdQuery } from "../../../../api/EventApi";
import type { Event } from "../../../../../types/events.type";
import { useState } from "react";
import HistoryEventCard from "./components/HistoryEventCard";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const { data: events = [], isLoading: isLoadingEvents } =
    useGetPastEventsByOngIdQuery();

  const filteredEvents = events.filter(
    (event: Event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        minHeight: "100vh",
        position: "relative",
        mb: 2,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box mb={8}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={2}>
          Meu Histórico de Eventos
        </Typography>
        <Typography color="text.primary" mb={3}>
          Visualize seus eventos passados
        </Typography>
        <Box maxWidth={400}>
          <TextField
            fullWidth
            sx={{
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
        </Box>
      </Box>

      <Stack spacing={3}>
        {isLoadingEvents ? (
          <Typography>Carregando eventos...</Typography>
        ) : (
          filteredEvents.map((event: Event) => (
            <HistoryEventCard
              key={event.id}
              event={event}
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
          <Typography color="text.primary">
            Tente buscar com outros termos ou crie um novo evento
          </Typography>
        </Box>
      )}
    </Container>
  );
}
