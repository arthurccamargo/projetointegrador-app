import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

// Global headers configuration
const globalHeaders: Record<string, string> = {};

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> = async (
	args,
	api,
	extraOptions
) => {
	const result = await fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders: (headers) => {
			Object.entries(globalHeaders).forEach(([key, value]) => {
				headers.set(key, value);
			});
			return headers;
		}
	})(args, api, extraOptions);

	// Example of handling specific error codes
	if (result.error && result.error.status === 401) {
		// Logic to handle 401 errors (e.g., refresh token)
	}

	return result;
};

// define o estado e as ações para chamadas de API
export const apiService = createApi({
	baseQuery,
	endpoints: () => ({}),
	reducerPath: 'apiService'
});

export default apiService;
