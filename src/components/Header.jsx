import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/authSlice';

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

const Header = () => {
    const { toggleColorMode } = useContext(ColorModeContext);
    const { palette } = useTheme();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [anchorEl, setAnchorEl] = React.useState(null);

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
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}>
                        Онлайн Магазин
                    </Typography>
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
                    <IconButton sx={{ ml: 1 }} color='inherit'>
                        <Badge badgeContent={2} color='error'>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
