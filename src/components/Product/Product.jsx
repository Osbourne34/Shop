import React from 'react';

import { Grid } from '@mui/material';

import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

const Product = ({ product }) => {
    return (
        <Grid container spacing={2}>
            <ProductImage images={product.images} alt={product.title} />
            <ProductInfo {...product} />
        </Grid>
    );
};

export default Product;
