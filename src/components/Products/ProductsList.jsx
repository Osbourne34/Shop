import React from 'react';

import { Grid } from '@mui/material';

import ProductItem from './ProductItem';

const ProductsList = ({ products, row }) => {
    return (
        <>
            <Grid container spacing={3}>
                {products.map((product) => {
                    return (
                        <Grid key={product.id} item xs={row}>
                            <ProductItem {...product} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default ProductsList;
