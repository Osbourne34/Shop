import React from 'react';
import { useSelector } from 'react-redux';

import Logo from './Logo';
import ThemeModeToggler from './ThemeModeToggler';
import CartButton from './CartButton';
import Profile from './Profile';
import SignIn from './SignIn';
import Cart from '../Cart/Cart';
import Search from './../Search/Search';

import { Box, AppBar, Toolbar } from '@mui/material';

const Header = () => {
    const isAuth = useSelector((state) => state.auth.user);

    return (
        <Box sx={{ mb: '64px' }}>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Logo />

                    <Search />

                    <Box>
                        <ThemeModeToggler />
                        {isAuth ? (
                            <Cart Component={CartButton} />
                        ) : (
                            <CartButton />
                        )}
                        {isAuth ? <Profile /> : <SignIn />}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
