import { useState } from "react";
import {
  Search,
  Plus,
} from "lucide-react";
import { events } from "../../../../../mocks/events.mock";
import {
  Container,
  Box,
  Typography,
  TextField,
  Fab,
  Stack,
} from "@mui/material";
import EventCard from "./components/EventCard";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEventos = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 6, minHeight: "100vh", position: "relative" }}
    >
      <Box mb={8}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={2}>
          Meus Eventos
        </Typography>
        <Typography color="text.common.black" mb={3}>
          Gerencie seus eventos e candidatos
        </Typography>
        {/* Search Bar */}
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

      {/* Events List */}
      <Stack spacing={3}>
        {filteredEventos.map((evento) => (
          <EventCard key={evento.id} evento={evento} />
        ))}
      </Stack>

      {/* No Results */}
      {filteredEventos.length === 0 && (
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
      >
        <Plus size={28} />
      </Fab>
    </Container>
  );
}
