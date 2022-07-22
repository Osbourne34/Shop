import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import authReducer from './authSlice';

import { productsApi } from './productsApi';

import { cartApi } from './cartApi';

import { categoriesApi } from './categoriesApi';

import MaterialUiReducer from './materialUiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        materialUi: MaterialUiReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productsApi.middleware,
            cartApi.middleware,
            categoriesApi.middleware,
        ),
});
