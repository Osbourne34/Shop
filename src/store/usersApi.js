import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        updateUser: build.mutation({
            query: ({ userId, body }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: body,
            }),
        }),
    }),
});

export const { useUpdateUserMutation } = usersApi;
