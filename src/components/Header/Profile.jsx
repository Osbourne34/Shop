import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from './../../store/authSlice';

import { IconButton, Menu, MenuItem } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';

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
        sessionStorage.clear();
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
                <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleCloseMenu}
                >
                    Профиль
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to="/login"
                    onClick={handleLogout}
                >
                    Выйти
                </MenuItem>
            </Menu>
        </>
    );
};

export default Profile;
