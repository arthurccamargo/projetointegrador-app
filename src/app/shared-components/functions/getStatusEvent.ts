export const getStatusColor = (status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED") => {
  const statusMap: Record<string, { label: string; bg: string; color: string }> = {
    SCHEDULED: { label: "AGENDADO", bg: "#1976d2", color: "#fff" }, // azul
    IN_PROGRESS: { label: "EM ANDAMENTO", bg: "#ff9800", color: "#fff" }, // laranja
    COMPLETED: { label: "CONCLUÍDO", bg: "#43a047", color: "#fff" }, // verde
    CANCELLED: { label: "CANCELADO", bg: "#e53935", color: "#fff" }, // vermelho
  };
  
  return statusMap[status] || { label: status, bg: "#757575", color: "#fff" }; // default: cinza
};