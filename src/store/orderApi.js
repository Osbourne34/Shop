import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/api-url';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Order'],
    endpoints: (build) => ({
        getUserOrder: build.query({
            query: ({ userId, page, limit }) => {
                return {
                    url: `/orders?userId=${userId}&_page=${page}&_limit=${limit}`,
                };
            },
            transformResponse(apiResponse, meta) {
                return {
                    apiResponse,
                    totalCount: Number(
                        meta.response.headers.get('X-Total-Count'),
                    ),
                };
            },
            providesTags: ['Order'],
        }),
        getOrder: build.query({
            query: (id) => ({
                url: `/orders/${id}`,
            }),
        }),
        orderCreate: build.mutation({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useOrderCreateMutation,
    useGetUserOrderQuery,
    useGetOrderQuery,
} = orderApi;
