import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['products'],
    endpoints: (build) => ({
        getProducts: build.query({
            query: (page) => ({ url: `/products?_page=${page}&_limit=12` }),
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;
