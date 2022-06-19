import React, { useEffect } from 'react';
import { useToggleDrawer } from '../hook/useToggleDrawer';

import { useSelector } from 'react-redux';
import { useLazyGetProductsFromUserCartQuery } from './../store/cartApi';
import { Link as RouterLink } from 'react-router-dom';

import {
    Box,
    Button,
    Typography,
    CircularProgress,
    IconButton,
} from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import CartItem from './CartItem';

const Cart = () => {
    const toggleDrawer = useToggleDrawer();

    const { user } = useSelector((state) => state.auth);
    const [getProductsFromUserCart, { data = [], isLoading }] =
        useLazyGetProductsFromUserCartQuery();

    useEffect(() => {
        if (user) {
            getProductsFromUserCart(user.id);
        }
    }, []);

    const totalPrice = () => {
        if (data?.cart && data.cart.length > 0) {
            return data.cart
                .map((item) => item.amount * item.price)
                .reduce((curr, next) => curr + next);
        }
        return 0;
    };

    return (
        <Box sx={{ width: '400px', p: 2, height: '100%' }}>
            {!user ? (
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Typography sx={{ mb: 4 }} variant='h4'>
                        Войдите в аккаунт
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Button
                            variant='outlined'
                            onClick={toggleDrawer('right', false)}
                            sx={{ mr: 2 }}>
                            Отмена
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={toggleDrawer('right', false)}
                            component={RouterLink}
                            to='/login'>
                            Войти
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: 'calc(100vh - 48px)',
                    }}>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexGrow: 1,
                            }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                }}>
                                <Typography variant='h4'>Корзина</Typography>
                                <IconButton
                                    onClick={toggleDrawer('right', false)}>
                                    <CloseRoundedIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                                {data.cart?.length > 0 ? (
                                    data.cart.map((cartItem) => {
                                        return (
                                            <CartItem
                                                key={cartItem.id}
                                                {...cartItem}
                                                isDisabled={
                                                    cartItem.amount > 1
                                                        ? false
                                                        : true
                                                }
                                            />
                                        );
                                    })
                                ) : (
                                    <Typography>Корзина пуста</Typography>
                                )}
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ mb: 1 }} variant='h6'>
                                    Итог: {totalPrice()} $
                                </Typography>
                                <Button
                                    sx={{ mt: 2 }}
                                    fullWidth
                                    variant='contained'>
                                    Оформление заказа
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Cart;
