import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useToggleDrawer } from '../../hook/useToggleDrawer';

import { DRAWER_SIDE } from '../../constants/ui';

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
            {cart.products.length > 0 ? (
                cart.products.map((product) => {
                    return (
                        <CartItem
                            key={product.id}
                            cart={cart}
                            product={{ ...product }}
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
                            onClick={toggleDrawer(DRAWER_SIDE, false)}
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
