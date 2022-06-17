import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlice';

import './app.css';

import { privateRoutes } from './routes';

import ProtectedRoute from './hoc/ProtectedRoute';
import Theme from './hoc/Theme';

import GoodsList from './components/GoodsList';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
    }, [dispatch]);

    return (
        <Theme>
            <Routes>
                <Route path='/' element={<Shop />}>
                    <Route index element={<GoodsList />} />
                    <Route path='product/:id' element={<ProductDetails />} />
                    <Route path='category/:category' element={<Category />} />
                </Route>

                <Route path='login' element={<Auth />} />
                <Route path='register' element={<Auth />} />

                {privateRoutes.map(({ path, Component }) => {
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <ProtectedRoute>
                                    <Component />
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </Theme>
    );
};

export default App;
