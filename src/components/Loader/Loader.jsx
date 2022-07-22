import React from 'react';

import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '200px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;
