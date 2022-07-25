import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    useRemoveProductMutation,
    useUpdateProductMutation,
} from '../../../store/cartApi';

import { useSnackbar } from 'notistack';

import { Box, Typography, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CartItem = ({ product, amount, id, disabledDecrease }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [removeProduct, { isLoading: removeLoading }] =
        useRemoveProductMutation();

    const [updateProduct, { isLoading: updateLoading }] =
        useUpdateProductMutation();

    const handleIncrease = () => {
        updateProduct({ id, amount: amount + 1 }).then(() => {
            enqueueSnackbar('Товар обновлен', {
                variant: 'success',
            });
        });
    };

    const handleDecrease = () => {
        updateProduct({ id, amount: amount - 1 }).then(() => {
            enqueueSnackbar('Товар обновлен', {
                variant: 'success',
            });
        });
    };

    const handleRemove = () => {
        removeProduct(id).then(() => {
            enqueueSnackbar('Товар удален', {
                variant: 'error',
            });
        });
    };

    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Box
                component={RouterLink}
                to={`/product/${id}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '60%',
                    textDecoration: 'none',
                    color: 'text.primary',
                }}
            >
                <img
                    className="product-photo product-photo_small"
                    src={product.thumbnail}
                    alt={product.title}
                />
                <Box sx={{ ml: 2 }}>
                    <Typography
                        fontWeight={600}
                        variant="body2"
                        sx={{ maxHeight: '40px', overflow: 'hidden' }}
                    >
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="primary">
                        {amount} x ${product.price}
                    </Typography>
                    <Typography variant="body2">
                        ${amount * product.price}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    disabled={
                        updateLoading || disabledDecrease || removeLoading
                    }
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
        </Box>
    );
};

export default React.memo(CartItem);
