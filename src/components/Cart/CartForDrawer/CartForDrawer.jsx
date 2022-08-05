import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { useToggleDrawer } from '../../../hook/useToggleDrawer';

import { Box, Typography, Button, IconButton } from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import CartList from '../CartList';
import TotalPrice from '../TotalPrice';
import CartItem from './CartItem';
import CheckoutButton from '../CheckoutButton';

const CartForDrawer = () => {
    const { user } = useSelector((state) => state.auth);
    const toggleDrawer = useToggleDrawer();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '450px',
                height: '100%',
                p: 2,
            }}
        >
            {user ? (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h4">Корзина</Typography>
                        <IconButton onClick={toggleDrawer('right', false)}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Box>

                    <CartList CartItem={CartItem} />
                    <TotalPrice />

                    <Box sx={{ mt: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/cart"
                            onClick={toggleDrawer('rigth', false)}
                            variant="outlined"
                            sx={{ mb: 1 }}
                            fullWidth
                        >
                            Корзина
                        </Button>
                        <CheckoutButton />
                    </Box>
                </>
            ) : (
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                        Для просмотра корзины авторизуйтесь!
                    </Typography>
                    <Box>
                        <Button
                            onClick={toggleDrawer('right', false)}
                            variant="outlined"
                            sx={{ mr: 2 }}
                        >
                            Позже
                        </Button>
                        <Button
                            onClick={toggleDrawer('right', false)}
                            component={RouterLink}
                            to="/login"
                            variant="contained"
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default CartForDrawer;
