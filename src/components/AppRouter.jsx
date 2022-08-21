import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../store/authSlice';

import MainLayout from './Layout/Layout';
import UserDashBoardLayout from './UserDashboard/Layout';
import Shop from '../pages/Shop';

import { ShopPublicRoutes } from '../routes';
import { ShopProtectedRoutes } from '../routes';
import { AuthRoutes } from '../routes';
import { UserRoutes } from '../routes';

const AppRouter = () => {
    const { user } = useSelector(auth);
    return (
        <Routes>
            <Route element={<MainLayout />}>
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
                    {user && (
                        <Route path="profile" element={<UserDashBoardLayout />}>
                            {UserRoutes.map(({ path, Component }, index) => (
                                <Route
                                    key={index}
                                    path={path ? path : ''}
                                    element={<Component />}
                                />
                            ))}
                        </Route>
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
