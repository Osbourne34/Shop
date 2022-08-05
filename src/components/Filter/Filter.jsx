import React from 'react';

import { Grid, Paper, Typography } from '@mui/material';

import Price from './Price';
import Brands from './Brands';

const Filter = ({ category }) => {
    return (
        <Grid item xs={3}>
            <Paper sx={{ boxShadow: 5, p: 2 }}>
                <Typography color="text.primary" variant="h5" sx={{ mb: 2 }}>
                    Цена
                </Typography>
                <Price category={category} />

                <Typography
                    color="text.primary"
                    variant="h5"
                    sx={{ mb: 2, mt: 2 }}
                >
                    Бренд
                </Typography>
                <Brands category={category} />
            </Paper>
        </Grid>
    );
};

export default React.memo(Filter);
