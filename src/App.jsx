import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from './store/authSlice';

import { SnackbarProvider } from 'notistack';

import './App.css';

import Theme from './theme/Theme';
import AppRouter from './components/AppRouter';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(updateUser(JSON.parse(localStorage.getItem('user'))));
        }
    }, [dispatch]);

    return (
        <Theme>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                maxSnack={3}
                autoHideDuration={1000}
            >
                <AppRouter />
            </SnackbarProvider>
        </Theme>
    );
};

export default App;
