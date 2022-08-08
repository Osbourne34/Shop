import React from 'react';

import { Paper, Box, Typography } from '@mui/material';

const OrderInfo = () => {
    const { products, totalPrice } = JSON.parse(
        sessionStorage.getItem('orderCart'),
    );

    return (
        <Paper sx={{ p: 2, boxShadow: 5 }}>
            <Typography
                color="text.primary"
                variant="h5"
                sx={{
                    mb: 2,
                    pb: 1,
                    borderBottomColor: 'text.primary',
                    borderBottom: '1px solid',
                }}
            >
                Ваш заказ
            </Typography>

            {products.map((item) => {
                return (
                    <Box
                        key={item.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        <Typography
                            color="text.primary"
                            sx={{ display: 'flex' }}
                        >
                            <Typography component="span" fontWeight={700}>
                                {item.amount}&nbsp;
                            </Typography>
                            x {item.title}
                        </Typography>
                        <Typography color="primary" sx={{ flexShrink: 0 }}>
                            ${item.price}
                        </Typography>
                    </Box>
                );
            })}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                }}
            >
                <Typography variant="h5" color="text.primary">
                    Итог:
                </Typography>
                <Typography variant="h5" color="text.primary">
                    ${totalPrice}
                </Typography>
            </Box>
        </Paper>
    );
};

export default OrderInfo;
