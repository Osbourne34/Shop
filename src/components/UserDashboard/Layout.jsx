import React from 'react';
import { Outlet } from 'react-router-dom';

import { Grid } from '@mui/material';

import Navigation from './Navigation';

const Layout = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Navigation />
            </Grid>
            <Grid item xs={9}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default Layout;
