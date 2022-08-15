import React from 'react';

import { Box, Typography } from '@mui/material';

const OrderProductItem = ({ thumbnail, title, price, amount, brand }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img
                src={thumbnail}
                alt={title}
                className="product-photo product-photo_tiny"
            />
            <Typography variant="h6" sx={{ flex: '2 1 0', ml: 2 }}>
                {title}
            </Typography>
            <Typography
                variant="h6"
                sx={{ flex: '1 1 0', color: 'primary.main' }}
            >
                {amount} x ${price}
            </Typography>
            <Typography variant="h6" sx={{ flex: '1 1 0' }}>
                ${amount * price}
            </Typography>
            <Typography variant="h6" sx={{ flex: '1 1 0' }}>
                {brand}
            </Typography>
        </Box>
    );
};

export default OrderProductItem;
