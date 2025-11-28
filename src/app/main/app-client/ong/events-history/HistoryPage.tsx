import { Stack, TextField } from "@mui/material";
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
        maxWidth="400px"
        color={theme.palette.text.primary}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1} sx={{ whiteSpace: "nowrap" }}>
          Meu Histórico de Eventos
        </Typography>
        <Typography color="text.primary" mb={3}>
          Visualize seus eventos passados
        </Typography>
        <Box>
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

      <Stack spacing={3} width="100%">
        {isLoadingEvents ? (
          <Typography color="text.primary">Carregando eventos...</Typography>
        ) : (
          filteredEvents.map((event: Event) => (
            <HistoryEventCard key={event.id} event={event} />
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
    </Box>
  );
}
