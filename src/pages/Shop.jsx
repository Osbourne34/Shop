import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToggleDrawer } from '../hook/useToggleDrawer';
import { useCloseNotification } from '../hook/useCloseNotification';
import { hideDialog } from './../store/materialUiSlice';

import { Link as RouterLink, Outlet } from 'react-router-dom';

import {
    Container,
    Drawer,
    Snackbar,
    Alert,
    DialogActions,
    DialogContentText,
    Button,
    Dialog,
    DialogContent,
} from '@mui/material';

import Header from '../components/Header';
import Cart from '../components/Cart';

const Shop = () => {
    const dispatch = useDispatch();

    const { anchor } = useSelector((state) => state.materialUi);
    const { isShowNotification } = useSelector((state) => state.materialUi);
    const { isShowDialog } = useSelector((state) => state.materialUi);
    const toggleDrawer = useToggleDrawer();
    const closeNotification = useCloseNotification();

    return (
        <>
            <Header />
            <Container
                sx={{
                    '&:before': {
                        content: "' '",
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'background.default',
                        zIndex: '-1',
                    },
                }}
                maxWidth='xl'>
                <Outlet />
            </Container>

            <Drawer
                anchor={'right'}
                open={anchor}
                onClose={toggleDrawer('right', false)}>
                <Cart />
            </Drawer>

            <Snackbar
                open={isShowNotification}
                autoHideDuration={2000}
                onClose={closeNotification}>
                <Alert
                    variant='filled'
                    onClose={closeNotification}
                    severity='success'
                    sx={{ width: '100%' }}>
                    Товар добавлен в корзину
                </Alert>
            </Snackbar>

            <Dialog open={isShowDialog} onClose={() => dispatch(hideDialog())}>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Для добавления товаров в корзину необходимо
                        авторизоваться.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        variant='outlined'
                        onClick={() => dispatch(hideDialog())}>
                        Позже
                    </Button>
                    <Button
                        sx={{ ml: 2 }}
                        component={RouterLink}
                        to='/login'
                        variant='outlined'
                        onClick={() => dispatch(hideDialog())}>
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Shop;
