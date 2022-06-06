import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlice';

import './app.css';

import { publicRoutes, privateRoutes } from './routes';

import ProtectedRoute from './hoc/ProtectedRoute';
import Theme from './hoc/Theme';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
    }, [dispatch]);

    return (
        <Theme>
            <Routes>
                {publicRoutes.map(({ path, Component }) => {
                    return (
                        <Route key={path} path={path} element={<Component />} />
                    );
                })}
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
