export const getVacancyColor = (available: number, total: number) => {
    const percent = (available / total) * 100;
    if (percent > 50) return "success.main";
    if (percent > 20) return "warning.main";
    return "error.main";
  };