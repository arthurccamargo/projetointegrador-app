import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
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
	endpoints: (builder) => ({
		getCategories: builder.query<any, void>({
			query: () => ({
				url: "/categories",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;
