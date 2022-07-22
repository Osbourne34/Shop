import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Typography } from '@mui/material';

const Logo = () => {
    return (
        <Typography
            component={RouterLink}
            to="/"
            variant="h5"
            sx={{ color: 'common.white', textDecoration: 'none' }}
        >
            Онлайн Магазин
        </Typography>
    );
};

export default Logo;
