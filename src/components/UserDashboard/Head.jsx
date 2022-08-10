import React from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/icons-material';

import PersonIcon from '@mui/icons-material/Person';

const Head = () => {
    const location = useLocation();
    console.log(location);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon color="primary" fontSize="large" />
                <Typography
                    fontWeight={500}
                    sx={{ ml: 2, color: 'text.primary' }}
                    variant="h4"
                >
                    Профиль
                </Typography>
            </Box>
            <Button variant="outlined">Редактировать профиль</Button>
        </Box>
    );
};

export default Head;
