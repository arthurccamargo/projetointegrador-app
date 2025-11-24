export const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      "Apoio Comunitário": { bg: "#1976d2", color: "#fff" }, // azul
      "Limpeza e Organização": { bg: "#00bcd4", color: "#fff" }, // ciano
      "Coleta e Distribuição": { bg: "#8bc34a", color: "#fff" }, // verde claro
      "Saúde e Bem-estar": { bg: "#e53935", color: "#fff" }, // vermelho
      "Animais": { bg: "#ff9800", color: "#fff" }, // laranja
      "Proteção Animal": { bg: "#ff9800", color: "#fff" }, // laranja
      "Outros": { bg: "#757575", color: "#fff" }, // cinza
      "Meio Ambiente": { bg: "#43a047", color: "#fff" }, // verde escuro
      "Educação": { bg: "#fbc02d", color: "#000" }, // amarelo
      "Assistência Social": { bg: "#5e35b1", color: "#fff" }, // roxo
      "Cultura e Arte": { bg: "#d81b60", color: "#fff" }, // rosa
      "Esporte e Lazer": { bg: "#00acc1", color: "#fff" }, // azul turquesa
      "Direitos Humanos": { bg: "#6d4c41", color: "#fff" }, // marrom
      "Tecnologia e Inovação": { bg: "#455a64", color: "#fff" }, // azul acinzentado
      "Alimentação": { bg: "#f57c00", color: "#fff" }, // laranja escuro
      "Moradia": { bg: "#7cb342", color: "#fff" }, // verde lima
    };
    return colors[category] || { bg: "#e0e0e0", color: "#000" }; // default: cinza claro
  };