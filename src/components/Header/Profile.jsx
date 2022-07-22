import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from './../../store/authSlice';

import { IconButton, Menu, MenuItem } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

const Profile = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('user');
        handleCloseMenu();
    };

    return (
        <>
            <IconButton onClick={handleOpenMenu} color="inherit" sx={{ ml: 1 }}>
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}>Профиль</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </>
    );
};

export default Profile;
