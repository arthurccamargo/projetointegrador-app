import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export interface CreateReviewDto {
	applicationId: string;
	rating: number;
	comment?: string;
}

export interface UpdateReviewDto {
	rating?: number;
	comment?: string;
}

export interface Review {
	id: string;
	rating: number;
	comment?: string;
	volunteerId: string;
	ongId: string;
	eventId: string;
	applicationId: string;
	createdAt: string;
	updatedAt: string;
}

export interface EligibleApplication {
	applicationId: string;
	event: {
		id: string;
		title: string;
		ong: {
			id: string;
			name: string;
		};
		category: {
			id: string;
			name: string;
		};
	};
	checkInAt: string;
	hoursRemaining: number;
	canReview: boolean;
}

export interface PaginatedReviews {
	data: Review[];
	total: number;
	page: number;
	limit: number;
}

export const reviewApi = createApi({
	reducerPath: 'reviewApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		}
	}),
	tagTypes: ['Review'],
	endpoints: (builder) => ({
		createReview: builder.mutation<Review, CreateReviewDto>({
			query: (dto) => ({
				url: '/reviews',
				method: 'POST',
				body: dto,
			}),
			invalidatesTags: ['Review'],
		}),
		
		getEligibleApplications: builder.query<EligibleApplication[], void>({
			query: () => ({
				url: '/reviews/eligible',
				method: 'GET',
			}),
		}),
		
		getMyReviews: builder.query<Review[], void>({
			query: () => ({
				url: '/reviews/my',
				method: 'GET',
			}),
			providesTags: ['Review'],
		}),
		
		getReviewsByOng: builder.query<PaginatedReviews, { ongId: string; page?: number; limit?: number }>({
			query: ({ ongId, page = 1, limit = 10 }) => ({
				url: `/reviews/ong/${ongId}`,
				method: 'GET',
				params: { page, limit },
			}),
			providesTags: ['Review'],
		}),
		
		updateReview: builder.mutation<Review, { id: string; dto: UpdateReviewDto }>({
			query: ({ id, dto }) => ({
				url: `/reviews/${id}`,
				method: 'PATCH',
				body: dto,
			}),
			invalidatesTags: ['Review'],
		}),
		
		deleteReview: builder.mutation<void, string>({
			query: (id) => ({
				url: `/reviews/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Review'],
		}),
	}),
});

export const {
	useCreateReviewMutation,
	useGetEligibleApplicationsQuery,
	useGetMyReviewsQuery,
	useGetReviewsByOngQuery,
	useUpdateReviewMutation,
	useDeleteReviewMutation,
} = reviewApi;
