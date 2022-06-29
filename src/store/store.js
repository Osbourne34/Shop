import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import MaterialUiReducer from './materialUiSlice';
import OrderReducer from './orderSlice';

import { authApi } from './authApi';
import { productsApi } from './productsApi';
import { cartApi } from './cartApi';
import { categoriesApi } from './categoriesApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        materialUi: MaterialUiReducer,
        order: OrderReducer,
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
