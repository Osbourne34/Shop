import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { useToggleDrawer } from '../../../hook/useToggleDrawer';

import { Box, Typography, Button, IconButton } from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import Cart from '../Cart';
import CartList from './CartList';
import TotalPrice from '../TotalPrice';

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

                    <Cart Component={CartList} />
                    <Cart Component={TotalPrice} />

                    <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" sx={{ mb: 1 }} fullWidth>
                            Корзина
                        </Button>
                        <Button variant="contained" fullWidth>
                            Оформить заказ
                        </Button>
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
                            component={RouterLink}
                            to="/login"
                            onClick={toggleDrawer('right', false)}
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
