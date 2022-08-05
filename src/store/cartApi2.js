import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi2 = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://ocalhost:3001' }),
    tagTypes: ['Cart2'],
    endpoints: (build) => ({
        getUserCart: build.query({
            query: (userId) => ({
                url: `/cart?userId=${userId}`,
            }),
            transformResponse: (response) => response[0],
        }),
        createCartAndAndProduct: build.mutation({
            query: (body) => ({
                url: '/cart',
                method: 'POST',
                body,
            }),
        }),
        updateCart: build.mutation({
            query: ({ products, id }) => ({
                url: `/cart/${id}`,
                method: 'PATCH',
                body: { products: [...products] },
            }),
        }),
    }),
});

export const {
    useLazyGetUserCartQuery,
    useCreateCartAndAndProductMutation,
    useUpdateCartMutation,
} = cartApi2;
