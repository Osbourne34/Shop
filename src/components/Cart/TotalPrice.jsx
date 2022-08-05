import React from 'react';

import { Box, Typography } from '@mui/material';

import { cartHOC } from './cartHOC';

const TotalPrice = ({ cart, mt }) => {
    return (
        <Box sx={{ justifyContent: 'space-between', display: 'flex', mt: mt ? mt : 0 }}>
            <Typography color="text.primary" variant="h5">
                Итог:
            </Typography>
            <Typography color="text.primary" variant="h5">
                ${cart?.totalPrice || 0}
            </Typography>
        </Box>
    );
};

export default cartHOC(React.memo(TotalPrice));
