import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import Shop from '../pages/Shop';
import Products from './Products/Products';
import ProductDetails from '../pages/ProductDetails';
import Category from '../pages/Category';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Payment from '../pages/Payment';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Shop />}>
                    <Route index element={<Products />} />
                    <Route path="product/:id" element={<ProductDetails />} />
                    <Route path="category/:category" element={<Category />} />
                    {user &&
                        [
                            { path: 'cart', component: <Cart /> },
                            { path: 'checkout', component: <Checkout /> },
                            { path: 'payment', component: <Payment /> },
                        ].map(({ path, component }, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    element={component}
                                />
                            );
                        })}
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default AppRouter;
