import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Grid, Typography, Breadcrumbs, Link } from "@mui/material";

import CheckoutForm from "./../components/CheckoutForm";
import OrderInfo from "../components/OrderInfo";

const Checkout = () => {
    return (
        <>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    color="inherit"
                >
                    Главная
                </Link>
                <Typography color="text.primary">Оформление заказа</Typography>
            </Breadcrumbs>

            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <CheckoutForm />
                </Grid>
                <Grid item xs={4}>
                    <OrderInfo />
                </Grid>
            </Grid>
        </>
    );
};

export default Checkout;
