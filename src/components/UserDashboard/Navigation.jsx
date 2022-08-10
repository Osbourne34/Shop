import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import { Paper, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Navigation = () => {
    const theme = useTheme();

    return (
        <Paper sx={{ boxShadow: 5, py: 2, px: 3 }}>
            <NavLink className={`link ${theme.palette.mode}`} to={''} end>
                <PersonIcon />
                <Typography sx={{ ml: 1 }} variant="h6">
                    Профиль
                </Typography>
            </NavLink>
            <NavLink className={`link ${theme.palette.mode}`} to="orders" end>
                <ShoppingBagOutlinedIcon />
                <Typography sx={{ ml: 1 }} variant="h6">
                    Заказы
                </Typography>
            </NavLink>
        </Paper>
    );
};

export default Navigation;
