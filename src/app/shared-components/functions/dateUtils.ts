export function convertUTCToBrazilTime(utcDate: string): { dateStr: string; timeStr: string } {
  const date = new Date(utcDate);
  // Converte para fuso horário do Brasil (America/São_Paulo)
  const brazilDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  
  const year = brazilDate.getFullYear();
  const month = String(brazilDate.getMonth() + 1).padStart(2, '0');
  const day = String(brazilDate.getDate()).padStart(2, '0');
  const hours = String(brazilDate.getHours()).padStart(2, '0');
  const minutes = String(brazilDate.getMinutes()).padStart(2, '0');
  
  return {
    dateStr: `${year}-${month}-${day}`,
    timeStr: `${hours}:${minutes}`
  };
}

export function formatDateTimeBrazil(utcDate: string): { date: string; time: string } {
  const date = new Date(utcDate);
  
  const formattedDate = date.toLocaleDateString('pt-BR', { 
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return {
    date: formattedDate,
    time: formattedTime
  };
}
