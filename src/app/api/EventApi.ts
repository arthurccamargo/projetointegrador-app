import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const eventApi = createApi({
  reducerPath: "eventApi",
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
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    createEvent: builder.mutation<any, { dto: any }>({
      query: ({ dto }) => ({
        url: "/events",
        method: "POST",
        body: dto,
      }),
      invalidatesTags: ["Events"],
    }),
    getEventsByOngId: builder.query<any, void>({
      query: () => ({
        url: "/events/my",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getActiveEventsByOngId: builder.query<any, void>({
      query: () => ({
        url: "/events/my/active",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getPastEventsByOngId: builder.query<any, void>({
      query: () => ({
        url: "/events/my/past",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getAllEvents: builder.query<any, void>({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    updateEvent: builder.mutation<any, { id: string; dto: any }>({
      query: ({ id, dto }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: dto,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsByOngIdQuery,
  useGetActiveEventsByOngIdQuery,
  useGetPastEventsByOngIdQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useGetAllEventsQuery,
} = eventApi;
