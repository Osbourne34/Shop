import { Box, Typography } from '@mui/material';
import React from 'react';

const TotalPrice = ({ cart }) => {
    return (
        <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <Typography variant="h5">Итог:</Typography>
            <Typography variant="h5">${cart?.totalPrice || 0}</Typography>
        </Box>
    );
};

export default TotalPrice;
