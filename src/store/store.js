import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import { authApi } from './authApi';
import { productsApi } from './productsApi';
import { cartApi } from './cartApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productsApi.middleware,
            cartApi.middleware,
        ),
});