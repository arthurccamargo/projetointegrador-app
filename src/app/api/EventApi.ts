import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const eventApi = createApi({
	reducerPath: 'eventApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = sessionStorage.getItem('token');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		}
	}),
	tagTypes: ['Events'],
	endpoints: (builder) => ({
		createEvent: builder.mutation<any, { dto: any }>({
			query: ({ dto }) => ({
				url: "/events",
				method: "POST",
				body: dto,
			}),
			invalidatesTags: ['Events'],
		}),
		getEventsByOngId: builder.query<any, void>({
			query: () => ({
				url: "/events/my",
				method: "GET",
			}),
			providesTags: ['Events'],
		}),
		deleteEvent: builder.mutation<any, { id: string }>({
			query: ({ id }) => ({
				url: `/events/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ['Events'],
		}),
	}),
});

export const { useCreateEventMutation, useGetEventsByOngIdQuery, useDeleteEventMutation } = eventApi;
