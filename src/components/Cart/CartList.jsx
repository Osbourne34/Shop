import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useToggleDrawer } from '../../hook/useToggleDrawer';

import { Box, Button, Typography } from '@mui/material';

import Loader from '../Loader/Loader';
import { cartHOC } from './cartHOC';

const Container = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            {children}
        </Box>
    );
};

const CartList = ({ cart, error, CartItem }) => {
    const toggleDrawer = useToggleDrawer();

    if (!cart && !error) {
        return (
            <Container>
                <Loader />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="text.primary" variant="h5" sx={{ mb: 2 }}>
                    Ошибка при загрузке данных
                </Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {cart.cart.length > 0 ? (
                cart.cart.map((item) => {
                    return (
                        <CartItem
                            key={item.id}
                            product={item.product}
                            cartId={item.id}
                            amount={item.amount}
                            disabledDecrease={item.amount === 1}
                        />
                    );
                })
            ) : (
                <Container>
                    <Box>
                        <Typography
                            color="text.primary"
                            textAlign="center"
                            variant="h5"
                            sx={{ mb: 2 }}
                        >
                            Корзина пуста
                        </Typography>
                        <Button
                            component={RouterLink}
                            to="/"
                            variant="outlined"
                            onClick={toggleDrawer('right', false)}
                        >
                            Добавить товары
                        </Button>
                    </Box>
                </Container>
            )}
        </Box>
    );
};

export default cartHOC(CartList);
