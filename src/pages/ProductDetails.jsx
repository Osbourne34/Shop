import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from './../store/productsApi';

import { Box, Typography, CircularProgress } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProductQuery(id);

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
    }

    return (
        <Box>
            <Typography sx={{ color: 'text.primary' }} variant='h2'>
                {data.title}
            </Typography>
        </Box>
    );
};

export default ProductDetails;
