import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import authReducer from './authSlice';

import { usersApi } from './usersApi';

import { productsApi } from './productsApi';

import { cartApi } from './cartApi';

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
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productsApi.middleware,
            cartApi.middleware,
            categoriesApi.middleware,
            orderApi.middleware,
            usersApi.middleware,
        ),
});
