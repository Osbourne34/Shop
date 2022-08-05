import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Shop from '../pages/Shop';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Products from './Products/Products';
import ProductDetails from '../pages/ProductDetails';
import Category from '../pages/Category';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Payment from '../pages/Payment';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Shop />}>
                <Route index element={<Products />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="category/:category" element={<Category />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="payment" element={<Payment />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
};

export default AppRouter;
