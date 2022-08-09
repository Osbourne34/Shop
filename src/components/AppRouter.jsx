import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './Layout/Layout';
import Shop from '../pages/Shop';

import { ShopPublicRoutes } from '../routes';
import { ShopProtectedRoutes } from '../routes';
import { AuthRoutes } from '../routes';

const AppRouter = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Shop />}>
                    {ShopPublicRoutes.map(({ path, Component }, index) => (
                        <Route
                            key={index}
                            path={path ? path : ''}
                            element={<Component />}
                        />
                    ))}
                    {user &&
                        ShopProtectedRoutes.map(
                            ({ path, Component }, index) => (
                                <Route
                                    key={index}
                                    path={path}
                                    element={<Component />}
                                />
                            ),
                        )}
                </Route>
            </Route>
            {AuthRoutes.map(({ path, Component }, index) => (
                <Route key={index} path={path} element={<Component />} />
            ))}
        </Routes>
    );
};

export default AppRouter;
