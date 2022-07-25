import React from 'react';

import { useToggleDrawer } from './../../../hook/useToggleDrawer';

import { Box, Button, Typography } from '@mui/material';

import CartItem from './CartItem';
import Loader from '../../Loader/Loader';

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

const CartList = ({ cart, error }) => {
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
                <Typography variant="h5" sx={{ mb: 2 }}>
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
                            key={item.product.id}
                            product={item.product}
                            id={item.id}
                            amount={item.amount}
                            disabledDecrease={item.amount === 1}
                        />
                    );
                })
            ) : (
                <Container>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Корзина пуста
                        </Typography>
                        <Button onClick={toggleDrawer('right', false)}>
                            Добавить товары
                        </Button>
                    </Box>
                </Container>
            )}
        </Box>
    );
};

export default CartList;
