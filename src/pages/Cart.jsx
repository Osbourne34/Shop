import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useLazyGetProductsFromUserCartQuery } from "./../store/cartApi";

import {
    Grid,
    Typography,
    Box,
    Button,
    Link,
    Breadcrumbs,
    CircularProgress,
} from "@mui/material";

import CartItem from "../components/CartItem";
import TotalPrice from "../components/TotalPrice";

const Cart = () => {
    const { user } = useSelector((state) => state.auth);

    const [getProductsFromUserCart, { data, isLoading, isSuccess }] =
        useLazyGetProductsFromUserCartQuery();

    useEffect(() => {
        if (user) {
            getProductsFromUserCart(user.id);
        }
    }, [user]);

    return (
        <>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to="/"
                >
                    Главная
                </Link>
                <Typography color="text.primary">Корзина</Typography>
            </Breadcrumbs>

            <Grid sx={{ mt: 3 }} container spacing={3}>
                <Grid item xs={9}>
                    {isLoading && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexGrow: 1,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                    {isSuccess && (
                        <>
                            {data.cart.length > 0 ? (
                                data.cart.map((item) => {
                                    return (
                                        <CartItem
                                            key={item.id}
                                            {...item}
                                            isDisabled={
                                                item.amount > 1 ? false : true
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        variant="h3"
                                        sx={{
                                            color: "text.primary",
                                            mt: 4,
                                            mb: 2,
                                        }}
                                    >
                                        Корзина пуста
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component={RouterLink}
                                        to="/"
                                    >
                                        Добавить товары
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </Grid>
                <Grid item xs={3}>
                    <TotalPrice cart={data?.cart} />
                    <Button
                        disabled={!(data?.cart.length > 0)}
                        component={RouterLink}
                        to="/checkout"
                        fullWidth
                        sx={{ mt: 4 }}
                        variant="contained"
                    >
                        Оформление заказа
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Cart;
