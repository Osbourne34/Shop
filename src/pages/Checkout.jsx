import React from 'react';
import { Navigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import OrderInfo from '../components/OrderInfo/OrderInfo';

const Checkout = () => {
    const orderCart = sessionStorage.getItem('orderCart');
    const orderInfo = sessionStorage.getItem('orderInfo');

    if (!(orderCart && orderCart)) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Breadcrumbs
                links={[
                    {
                        link: '/cart',
                        title: 'Корзина',
                    },
                    {
                        title: 'Оформление заказа',
                    },
                ]}
            />

            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <CheckoutForm />
                </Grid>
                <Grid item xs={3}>
                    <OrderInfo />
                </Grid>
            </Grid>
        </>
    );
};

export default Checkout;
