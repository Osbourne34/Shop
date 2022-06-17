import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => ({
                url: '/categories',
            }),
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
