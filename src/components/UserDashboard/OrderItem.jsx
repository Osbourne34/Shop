import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Typography, Paper, Chip } from '@mui/material';

const OrderItem = ({ id, status, totalPrice }) => {
    return (
        <Paper
            component={RouterLink}
            to={`${id}`}
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                boxShadow: 5,
                mb: 2,
                textDecoration: 'none',
            }}
        >
            <Typography
                sx={{
                    flex: '1 1 0',
                    color: 'text.primary',
                }}
            >
                {id}
            </Typography>
            <Typography
                textTransform="capitalize"
                sx={{
                    flex: '1 1 0',
                    color: 'text.primary',
                }}
            >
                {status === 'pending' && <Chip label="pending" />}
            </Typography>
            <Typography
                sx={{
                    flex: '1 1 0',
                    color: 'text.primary',
                }}
            >
                ${totalPrice}
            </Typography>
        </Paper>
    );
};

export default OrderItem;
