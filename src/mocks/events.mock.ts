export const events = [
  {
    id: "1",
    title: "Distribuição de Alimentos",
    description: "Distribuição de cestas básicas para famílias carentes",
    startDate: "2024-01-14T09:00:00.000Z",
    durationMinutes: 240,
    location: "Centro Comunitário - Vila Esperança",
    maxCandidates: 15,
    currentCandidates: 8,
    createdAt: "2023-12-01T10:00:00.000Z",
    updatedAt: "2023-12-10T10:00:00.000Z",
    ongId: "ong1",
    ong: {
      id: "ong1",
      name: "ONG Mãos Solidárias",
      // ...outros campos necessários do OngProfile...
    },
    categoryId: "cat1",
    category: {
      id: "cat1",
      name: "Assistência Social",
      // ...outros campos necessários do Category...
    }
  },
  {
    id: "2",
    title: "Plantio de Árvores",
    description: "Reflorestamento no parque municipal",
    startDate: "2024-01-19T09:00:00.000Z",
    durationMinutes: 180,
    location: "Parque Municipal da Cidade",
    maxCandidates: 20,
    currentCandidates: 12,
    createdAt: "2023-12-02T10:00:00.000Z",
    updatedAt: "2023-12-11T10:00:00.000Z",
    ongId: "ong2",
    ong: {
      id: "ong2",
      name: "Verde Vida",
      // ...outros campos necessários do OngProfile...
    },
    categoryId: "cat2",
    category: {
      id: "cat2",
      name: "Meio Ambiente",
      // ...outros campos necessários do Category...
    }
  }
];