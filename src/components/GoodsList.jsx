import React, { useState } from 'react';
import { useGetProductsQuery } from './../store/productsApi';

import { Grid, CircularProgress, Box, Typography, Button } from '@mui/material';
import GoodItem from './GoodItem';

const GoodsList = () => {
    const [page, setPage] = useState(1);

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
    } = useGetProductsQuery(page);

    const handleLoad = () => {
        setPage(page + 1);
    };

    let content;

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    height: '200px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <CircularProgress />;
            </Box>
        );
    } else if (isSuccess) {
        content = products.map((product) => {
            return (
                <Grid key={product.id} item xs={3}>
                    <GoodItem {...product} />
                </Grid>
            );
        });
    } else if (isError) {
        return (
            <Typography sx={{ color: 'text.primary', mt: 3 }} variant='h1'>
                Упс ошибка...
            </Typography>
        );
    }

    return (
        <>
            <Grid sx={{ mb: 5 }} container spacing={3}>
                {content}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleLoad} variant='contained' sx={{ mb: 3 }}>
                    Показать ещё
                </Button>
            </Box>
        </>
    );
};

export default GoodsList;
