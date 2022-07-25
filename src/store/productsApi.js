import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { nanoid } from '@reduxjs/toolkit';

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
        getProductsPage: build.query({
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
        getBrandsFromCategory: build.query({
            query: (category) => ({
                url: `/products?category=${category}`,
            }),
            transformResponse: (response) => {
                const uniqueBrands = [
                    ...new Set(response.map((item) => item.brand)),
                ];
                return uniqueBrands.map((brand) => ({
                    brand,
                    id: nanoid(),
                }));
            },
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductQuery,
    useLazyGetProductsPageQuery,
    useGetProductsByCategoryQuery,
    useGetBrandsFromCategoryQuery,
} = productsApi;
