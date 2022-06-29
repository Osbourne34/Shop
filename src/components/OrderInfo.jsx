import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyGetProductsFromUserCartQuery } from "./../store/cartApi";

import { Box, Typography } from "@mui/material";

import TotalPrice from "./TotalPrice";

const OrderInfo = React.memo(() => {
    const { user } = useSelector((state) => state.auth);

    const [getProductsFromUserCart, { data, isLoading }] =
        useLazyGetProductsFromUserCartQuery();

    useEffect(() => {
        if (user) {
            getProductsFromUserCart(user.id);
        }
    }, [user]);

    return (
        <Box>
            <Typography variant="h5" sx={{ color: "text.primary", mb: 2 }}>
                Ваш заказ
            </Typography>
            {isLoading && (
                <Typography sx={{ color: "text.primary" }}>
                    Загрузка...
                </Typography>
            )}
            {data &&
                data.cart.map((product) => {
                    return (
                        <Box
                            key={product.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ color: "text.primary" }}>
                                    {product.amount}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                >
                                    &nbsp;x {product.title}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: "text.primary" }}>
                                ${product.price * product.amount}
                            </Typography>
                        </Box>
                    );
                })}
            <TotalPrice cart={data?.cart} />
        </Box>
    );
});

export default OrderInfo;
