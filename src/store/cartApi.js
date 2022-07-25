import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Cart'],
    endpoints: (build) => ({
        getProductFromUserCart: build.query({
            query: ({ userId, productId }) => ({
                url: `/cart?userId=${userId}&productId=${productId}`,
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
        getUserCart: build.query({
            query: (userId) => ({
                url: `cart?userId=${userId}&_expand=product`,
            }),
            transformResponse(result) {
                if (result.length > 0) {
                    const totalCount = result.reduce((start, next) => {
                        return start + next.amount;
                    }, 0);
                    const totalPrice = result
                        .map((item) => {
                            return item.amount * item.product.price;
                        })
                        .reduce((start, next) => start + next);
                    return {
                        cart: result,
                        totalCount,
                        totalPrice,
                    };
                }
                return {
                    cart: [],
                    totalCount: 0,
                    totalPrice: 0,
                };
            },
            providesTags: [{ type: 'Cart', id: 'LIST' }],
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
    useLazyGetProductFromUserCartQuery,
    useLazyGetUserCartQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation,
} = cartApi;
