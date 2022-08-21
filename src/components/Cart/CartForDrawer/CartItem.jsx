import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useToggleDrawer } from '../../../hook/useToggleDrawer';

import { DRAWER_SIDE } from '../../../constants/ui';

import { Box, Typography } from '@mui/material';

import ItemActions from '../ItemActions';

const CartItem = ({ product, cart }) => {
    const toggleDrawer = useToggleDrawer();

    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Box
                onClick={toggleDrawer(DRAWER_SIDE, false)}
                component={RouterLink}
                to={`/product/${product.id}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '60%',
                    textDecoration: 'none',
                    color: 'text.primary',
                }}
            >
                <img
                    className="product-photo product-photo_small"
                    src={product.thumbnail}
                    alt={product.title}
                />
                <Box sx={{ ml: 2 }}>
                    <Typography
                        fontWeight={600}
                        variant="body2"
                        sx={{ maxHeight: '40px', overflow: 'hidden' }}
                    >
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="primary">
                        {product.amount} x ${product.price}
                    </Typography>
                    <Typography variant="body2">
                        ${product.amount * product.price}
                    </Typography>
                </Box>
            </Box>
            <ItemActions cart={cart} product={product} />
        </Box>
    );
};

export default React.memo(CartItem);
