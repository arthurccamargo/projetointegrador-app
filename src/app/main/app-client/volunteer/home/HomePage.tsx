import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Stack, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useState } from "react";
import type { Event } from "../../../../../types/events.type";
import { useGetAllEventsQuery } from "../../../../api/EventApi";
import EventCardToVolunteer from "./components/EventCardToVolunteer";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: events = [], isLoading: isLoadingEvents } =
    useGetAllEventsQuery();

  const filteredEvents = events.filter(
    (event: Event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 2, minHeight: "100vh", position: "relative", mb: 2 }}
    >
      <Box mb={8}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={2}>
          Buscar Opotunidades
        </Typography>
        <Typography color="text.common.black" mb={3}>
          Encontre oportunidades para fazer a diferença
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
            <EventCardToVolunteer
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
          <Typography color="text.secondary">
            Tente buscar com outros termos ou crie um novo evento
          </Typography>
        </Box>
      )}
    </Container>
  );
}
