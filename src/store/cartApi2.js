import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi2 = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Cart2'],
    endpoints: (build) => ({}),
});

export const {} = cartApi2;
