import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/api-url';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
