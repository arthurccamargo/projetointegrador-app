import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const eventApplicationApi = createApi({
  reducerPath: "eventApplicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["EventApplication"],
  endpoints: (builder) => ({
    // Voluntário se candidata
    apply: builder.mutation<any, { eventId: string }>({
      query: (body) => ({
        url: "/applications",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["EventApplication"],
    }),
    // ONG aceita ou rejeita candidatura
    updateStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["EventApplication"],
    }),
    // Voluntário cancela a candidatura
    cancel: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/applications/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["EventApplication"],
    }),
    // Exemplo de query para listar candidaturas do voluntario logado
    getAllActiveApplicationsByVolunteer: builder.query<any[], void>({
      query: () => ({
        url: "/applications/active",
        method: "GET",
      }),
      providesTags: ["EventApplication"],
    }),
  }),
});

export const {
  useApplyMutation,
  useUpdateStatusMutation,
  useCancelMutation,
  useGetAllActiveApplicationsByVolunteerQuery,
} = eventApplicationApi;
