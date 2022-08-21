import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from './store/authSlice';

import { SnackbarProvider } from 'notistack';

import { SNACKBAR_SIDE, MAX_SNACK, AUTO_HIDE_DURATION } from './constants/ui';

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
                anchorOrigin={SNACKBAR_SIDE}
                maxSnack={MAX_SNACK}
                autoHideDuration={AUTO_HIDE_DURATION}
            >
                <AppRouter />
            </SnackbarProvider>
        </Theme>
    );
};

export default App;
