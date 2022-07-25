import React from 'react';

import { Grid, Typography } from '@mui/material';

import Price from './Price';
import Brands from './Brands';

const Filter = ({ category }) => {
    return (
        <Grid item xs={3}>
            <Typography color="text.primary" variant="h5" sx={{ mb: 2 }}>
                Цена
            </Typography>
            <Price category={category} />

            <Typography color="text.primary" variant="h5" sx={{ mb: 2, mt: 2 }}>
                Бренд
            </Typography>
            <Brands category={category} />
        </Grid>
    );
};

export default React.memo(Filter);
