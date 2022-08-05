import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (build) => ({
        orderCreate: build.mutation({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useOrderCreateMutation } = orderApi;
