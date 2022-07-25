import React from 'react';

import { Grid, Typography } from '@mui/material';

import AddToCartButton from '../../components/AddToCartButton/AddToCartButton';

const ProductInfo = ({ title, brand, category, description, price, id }) => {
    return (
        <Grid item xs={6}>
            <Typography color="text.primary" variant="h3" mb={3}>
                {title}
            </Typography>
            <Typography
                color="text.primary"
                variant="h5"
                sx={{ textTransform: 'capitalize' }}
            >
                Brand: {brand}
            </Typography>
            <Typography
                color="text.primary"
                variant="h5"
                mt={2}
                sx={{ textTransform: 'capitalize' }}
            >
                Сategory: {category}
            </Typography>
            <Typography color="text.primary" mt={2} sx={{ maxWidth: '450px' }}>
                {description}
            </Typography>

            <Typography color="text.primary" variant="h4" sx={{ my: 4 }}>
                ${price}
            </Typography>

            <AddToCartButton productId={id} />
        </Grid>
    );
};

export default ProductInfo;
