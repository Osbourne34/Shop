import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Cart'],
    endpoints: (build) => ({
        getProductsFromUserCart: build.query({
            query: (userId) => ({
                url: `http://localhost:3001/users/${userId}?_embed=cart`,
            }),
            providesTags: (result) => {
                return result.data
                    ? [
                          ...result.map(({ id }) => ({ type: 'Cart', id })),
                          { type: 'Cart', id: 'LIST' },
                      ]
                    : [{ type: 'Cart', id: 'LIST' }];
            },
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: '/cart',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
        }),
        updateProduct: build.mutation({
            query: ({ id, amount }) => ({
                url: `/cart/${id}`,
                method: 'PATCH',
                body: { amount },
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
        }),
        removeProduct: build.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
        }),
    }),
});

export const {
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation,
    useLazyGetProductsFromUserCartQuery,
} = cartApi;
