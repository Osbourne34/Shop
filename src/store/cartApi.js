import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Cart'],
    endpoints: (build) => ({
        getUserCart: build.query({
            query: (userId) => ({
                url: `/cart?userId=${userId}`,
            }),
            providesTags: ['Cart'],
            transformResponse: (response) => {
                if (!response.length || response[0].products.length === 0) {
                    return {
                        totalPrice: 0,
                        totalCount: 0,
                        products: [],
                    };
                }
                const totalPrice = response[0].products
                    .map((item) => {
                        return item.price * item.amount;
                    })
                    .reduce((curr, next) => {
                        return curr + next;
                    });
                const totalCount = response[0].products.reduce(
                    (start, next) => {
                        return start + next.amount;
                    },
                    0
                );
                return {
                    ...response[0],
                    totalPrice,
                    totalCount,
                };
            },
        }),
        createCartAndAndProduct: build.mutation({
            query: (body) => ({
                url: '/cart',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Cart'],
        }),
        updateCart: build.mutation({
            query: ({ products, id }) => ({
                url: `/cart/${id}`,
                method: 'PATCH',
                body: { products },
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useLazyGetUserCartQuery,
    useCreateCartAndAndProductMutation,
    useUpdateCartMutation,
} = cartApi;
