import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/api-url';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Cart'],
    endpoints: (build) => ({
        getUserCart: build.query({
            query: (userId) => ({
                url: `/cart?userId=${userId}`,
            }),
            providesTags: ['Cart'],
            transformResponse: (response) => {
                if (!response.length) {
                    return {
                        totalPrice: 0,
                        totalCount: 0,
                        products: [],
                    };
                }
                if (response[0].products.length > 0) {
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
                        0,
                    );
                    return {
                        ...response[0],
                        totalPrice,
                        totalCount,
                    };
                }
                return response[0];
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
        clearCart: build.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useLazyGetUserCartQuery,
    useCreateCartAndAndProductMutation,
    useUpdateCartMutation,
    useClearCartMutation,
} = cartApi;
