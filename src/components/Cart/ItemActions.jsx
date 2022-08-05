import React from 'react';

import {
    useRemoveProductMutation,
    useUpdateProductMutation,
} from '../../store/cartApi';

import { useSnackbar } from 'notistack';

import { Box, Typography, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ItemActions = ({ cartId, amount, disabledDecrease }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [removeProduct, { isLoading: removeLoading }] =
        useRemoveProductMutation();

    const [updateProduct, { isLoading: updateLoading }] =
        useUpdateProductMutation();

    const handleIncrease = () => {
        updateProduct({ id: cartId, amount: amount + 1 }).then(() => {
            enqueueSnackbar('Товар обновлен', {
                variant: 'success',
            });
        });
    };

    const handleDecrease = () => {
        updateProduct({ id: cartId, amount: amount - 1 }).then(() => {
            enqueueSnackbar('Товар обновлен', {
                variant: 'success',
            });
        });
    };

    const handleRemove = () => {
        removeProduct(cartId).then(() => {
            enqueueSnackbar('Товар удален', {
                variant: 'error',
            });
        });
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                disabled={updateLoading || removeLoading || disabledDecrease}
                onClick={handleDecrease}
                size="small"
            >
                <RemoveIcon />
            </IconButton>
            <Typography color="primary" sx={{ mx: 1 }}>
                {amount}
            </Typography>
            <IconButton
                disabled={updateLoading || removeLoading}
                onClick={handleIncrease}
                size="small"
            >
                <AddIcon />
            </IconButton>
            <IconButton
                disabled={removeLoading || updateLoading}
                onClick={handleRemove}
                sx={{ ml: 1 }}
                size="small"
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default React.memo(React.memo(ItemActions));
