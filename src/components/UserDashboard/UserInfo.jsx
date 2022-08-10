import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Paper, Typography } from '@mui/material';

const InfoItem = ({ property, value }) => {
    return (
        <Box sx={{ flex: '1 1 0' }}>
            <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                {property}
            </Typography>
            {value && <Typography>{value}</Typography>}
        </Box>
    );
};

const UserInfo = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Paper
            sx={{
                boxShadow: 5,
                p: 3,
                display: 'flex',
            }}
        >
            <InfoItem property="Имя" value={user?.firstName} />
            <InfoItem property="Фамилия" value={user?.lastName} />
            <InfoItem property="Email" value={user?.email} />
            <InfoItem property="Телефон" value={user?.phone} />
        </Paper>
    );
};

export default UserInfo;
