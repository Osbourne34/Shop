import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (build) => ({
        register: build.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),
        login: build.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
