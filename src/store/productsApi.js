import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: '/products',
            }),
            transformResponse(result) {
                return result.map((item) => ({
                    id: item.id,
                    title: item.title,
                    thumbnail: item.thumbnail,
                }));
            },
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `/products/${id}`,
            }),
        }),
        getProducts: build.query({
            query: (page) => ({ url: `/products?_page=${page}&_limit=12` }),
            transformResponse(apiResponse, meta) {
                return {
                    apiResponse,
                    totalCount: Number(
                        meta.response.headers.get('X-Total-Count'),
                    ),
                };
            },
        }),
        getProductsByCategory: build.query({
            query: (params) => ({
                url: `/products?${params}`,
            }),
        }),
        getProductBrands: build.query({
            query: (category) => ({
                url: `/products?category=${category}`,
            }),
            transformResponse: (response) => [
                ...new Set(response.map((item) => item.brand)),
            ],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductQuery,
    useLazyGetProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductBrandsQuery,
} = productsApi;
