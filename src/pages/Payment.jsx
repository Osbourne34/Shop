import React from 'react';

import { Grid } from '@mui/material';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import OrderInfo from '../components/OrderInfo/OrderInfo';
import PaymentForm from '../components/PaymentForm/PaymentForm';

const Payment = () => {
    return (
        <>
            <Breadcrumbs
                links={[
                    {
                        link: '/cart',
                        title: 'Корзина',
                    },
                    {
                        link: '/checkout',
                        title: 'Оформление заказа',
                    },
                    {
                        title: 'Оплата',
                    },
                ]}
            />
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <PaymentForm />
                </Grid>
                <Grid item xs={3}>
                    <OrderInfo />
                </Grid>
            </Grid>
        </>
    );
};

export default Payment;
