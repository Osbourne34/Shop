import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import { authApi } from './authApi';
import { productsApi } from './productsApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productsApi.middleware,
        ),
});
