import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { PENDING, CANCELED, SUCCESS } from '../../constants/statuses';

import { Typography, Paper, Chip } from '@mui/material';

const OrderItem = ({ id, status, totalPrice, orderDate }) => {
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
                component="div"
                textTransform="capitalize"
                sx={{
                    flex: '1 1 0',
                    color: 'text.primary',
                }}
            >
                {status === PENDING && <Chip label="Ожидание" />}
                {status === CANCELED && <Chip label="Отменен" color="error" />}
                {status === SUCCESS && (
                    <Chip label="Выполнен" color="success" />
                )}
            </Typography>
            <Typography
                sx={{
                    flex: '1 1 0',
                    color: 'text.primary',
                }}
            >
                {orderDate.date}
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
