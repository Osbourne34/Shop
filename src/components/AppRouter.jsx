import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Shop from '../pages/Shop';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Products from './Products/Products';
import ProductDetails from '../pages/ProductDetails';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Shop />}>
                <Route index element={<Products />} />
                <Route path="product/:id" element={<ProductDetails />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
};

export default AppRouter;
