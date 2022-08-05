import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import authReducer from './authSlice';

import { productsApi } from './productsApi';

import { cartApi } from './cartApi';
import { cartApi2 } from './cartApi2';

import { categoriesApi } from './categoriesApi';

import { orderApi } from './orderApi';

import MaterialUiReducer from './materialUiSlice';

import filterReducer from './filterSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        materialUi: MaterialUiReducer,
        filter: filterReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [cartApi2.reducerPath]: cartApi2.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productsApi.middleware,
            cartApi.middleware,
            cartApi2.middleware,
            categoriesApi.middleware,
            orderApi.middleware,
        ),
});
