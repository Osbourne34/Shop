import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Order'],
    endpoints: (build) => ({
        getOrderByUser: build.query({
            query: (userId) => ({
                url: `/users/${userId}?_embed=orders`,
            }),
            providesTags: ['Cart'],
        }),
        orderCreate: build.mutation({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const { useOrderCreateMutation, useGetOrderByUserQuery } = orderApi;
