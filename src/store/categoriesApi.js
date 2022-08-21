import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/api-url';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => ({
                url: '/categories',
            }),
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
