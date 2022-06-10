import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/authSlice';
import { useLazyGetProductsFromUserCartQuery } from './../store/cartApi';

import { Link as RouterLink } from 'react-router-dom';

import { ColorModeContext } from './../hoc/Theme';
import { useTheme } from '@mui/material/styles';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Menu,
    MenuItem,
} from '@mui/material';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Search from './Search';

const Header = ({ toggleDrawer }) => {
    const { toggleColorMode } = useContext(ColorModeContext);
    const { palette } = useTheme();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [getProductsFromUserCart, { data = [] }] =
        useLazyGetProductsFromUserCartQuery();

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (user) {
            getProductsFromUserCart(user.id);
        }
    }, [user]);

    let numberOfItemsInCart;

    if (data?.cart && data.cart.length > 0) {
        numberOfItemsInCart = data.cart
            .map((item) => item.amount)
            .reduce((curr, next) => curr + next);
    } else {
        numberOfItemsInCart = 0;
    }

    const handleLogout = () => {
        handleClose();
        dispatch(logOut());
        localStorage.removeItem('user');
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1, mb: 15 }}>
            <AppBar position='fixed'>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant='h6' component='div'>
                        Онлайн Магазин
                    </Typography>

                    <Search />

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            sx={{ ml: 1 }}
                            color='inherit'
                            onClick={toggleColorMode}>
                            {palette.mode !== 'light' ? (
                                <LightModeIcon />
                            ) : (
                                <DarkModeIcon />
                            )}
                        </IconButton>
                        <IconButton sx={{ ml: 1 }} color='inherit'>
                            <Badge badgeContent={2} color='error'>
                                <FavoriteBorderIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            onClick={toggleDrawer('right', true)}
                            sx={{ ml: 1 }}
                            color='inherit'>
                            <Badge
                                badgeContent={user ? numberOfItemsInCart : 0}
                                color='error'>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        {user ? (
                            <>
                                <IconButton
                                    sx={{ ml: 1 }}
                                    onClick={handleMenu}
                                    color='inherit'>
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id='menu-appbar'
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}>
                                    <MenuItem
                                        component={RouterLink}
                                        to='/profile'
                                        onClick={handleClose}>
                                        Профиль
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Выйти
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                component={RouterLink}
                                to='/login'
                                sx={{ ml: 2 }}
                                color='inherit'
                                variant='outlined'>
                                Войти
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
