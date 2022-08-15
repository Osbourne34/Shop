import React from 'react';

import { Paper, Typography } from '@mui/material';
import OrderProductItem from './OrderProductItem';

const OrderProductsList = ({ products }) => {
    return (
        <Paper sx={{ pt: 2, px: 2, boxShadow: 5, overflow: 'hidden' }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.primary' }}>
                Продукты
            </Typography>
            {products.map((product) => (
                <OrderProductItem key={product.id} {...product} />
            ))}
        </Paper>
    );
};

export default OrderProductsList;
