import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../store/authSlice';

import Logo from './Logo';
import ThemeModeToggler from './ThemeModeToggler';
import CartButton from './CartButton';
import Profile from './Profile';
import SignIn from './SignIn';
import Search from './../Search/Search';

import { Box, AppBar, Toolbar } from '@mui/material';

const Header = () => {
    const { user } = useSelector(auth);

    return (
        <Box sx={{ mb: '64px' }}>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Logo />

                    <Search />

                    <Box>
                        <ThemeModeToggler />
                        {user ? <CartButton /> : <CartButton cart={[]} />}
                        {user ? <Profile /> : <SignIn />}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
