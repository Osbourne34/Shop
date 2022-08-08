import React from 'react';

import { useUpdateCartMutation } from '../../store/cartApi';

import { useSnackbar } from 'notistack';

import { Box, Typography, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ItemActions = ({ cart, product }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [updateCart] = useUpdateCartMutation();

    const handleIncrease = async () => {
        const newProducts = cart.products.map((item) => {
            if (item.id === product.id) {
                return { ...item, amount: item.amount + 1 };
            }
            return item;
        });

        const { error } = await updateCart({
            id: cart.id,
            products: newProducts,
        });

        if (error) {
            enqueueSnackbar('Ошибка при обновлений', {
                variant: 'error',
            });
        }

        enqueueSnackbar('Значение обновлено', {
            variant: 'success',
        });
    };

    const handleDecrease = () => {
        const newProducts = cart.products.map((item) => {
            if (item.id === product.id) {
                return { ...item, amount: item.amount - 1 };
            }
            return item;
        });

        updateCart({ id: cart.id, products: newProducts });
    };

    const handleRemove = () => {
        const newProducts = cart.products.filter((item) => {
            if (product.id !== item.id) {
                return item;
            }
        });

        updateCart({ id: cart.id, products: newProducts });
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                disabled={product.amount === 1}
                onClick={handleDecrease}
                size="small"
            >
                <RemoveIcon />
            </IconButton>
            <Typography color="primary" sx={{ mx: 1 }}>
                {product.amount}
            </Typography>
            <IconButton onClick={handleIncrease} size="small">
                <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemove} sx={{ ml: 1 }} size="small">
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default React.memo(ItemActions);
