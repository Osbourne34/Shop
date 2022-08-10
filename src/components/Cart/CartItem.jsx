import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Typography, CardMedia, Paper } from '@mui/material';

import ItemActions from './ItemActions';

const CartItem = ({ cart, product }) => {
    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                boxShadow: 5,
                mb: 3,
                pr: 2,
            }}
        >
            <Box
                component={RouterLink}
                to={`/product/${product.id}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    flexGrow: 1,
                    mr: 2,
                    p: 2,
                    color: 'text.primary',
                    textDecoration: 'none',
                }}
            >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-photo product-photo_medium"
                />
                <Box sx={{ ml: 3 }}>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography color="primary">
                        {product.amount} x ${product.price}
                    </Typography>
                    <Typography>${product.price * product.amount}</Typography>
                </Box>
            </Box>

            <ItemActions cart={cart} product={product} />
        </Paper>
    );
};

export default React.memo(CartItem);
