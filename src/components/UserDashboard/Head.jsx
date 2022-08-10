import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';

const Head = ({ Icon, title, button, link }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon fontSize="large" color="primary" />
                <Typography
                    fontWeight={500}
                    sx={{ ml: 2, color: 'text.primary' }}
                    variant="h4"
                >
                    {title}
                </Typography>
            </Box>
            {button && (
                <Button
                    component={link ? RouterLink : 'button'}
                    to={link ? link : ''}
                    variant="outlined"
                >
                    {button}
                </Button>
            )}
        </Box>
    );
};

export default Head;
