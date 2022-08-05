import React from 'react';

import { Grid, Paper } from '@mui/material';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import TotalPrice from '../components/Cart/TotalPrice';
import CartList from '../components/Cart/CartList';
import CartItem from '../components/Cart/CartItem';
import CheckoutButton from '../components/Cart/CheckoutButton';

const Cart = () => {
    return (
        <>
            <Breadcrumbs
                links={[
                    {
                        link: null,
                        title: 'Корзина',
                    },
                ]}
            />

            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <CartList CartItem={CartItem} />
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={{ boxShadow: 5, p: 2 }}>
                        <TotalPrice />
                        <CheckoutButton mt={2} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default React.memo(Cart);
