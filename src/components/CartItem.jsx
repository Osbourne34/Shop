import React from 'react';
import { useToggleDrawer } from '../hook/useToggleDrawer';

import { Link as RouterLink } from 'react-router-dom';
import {
    useUpdateProductMutation,
    useRemoveProductMutation,
} from './../store/cartApi';

import { Box, CardMedia, Typography, IconButton, Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({
    title,
    price,
    thumbnail,
    amount,
    id,
    productId,
    isDisabled,
}) => {
    const toggleDrawer = useToggleDrawer();

    const [updateProduct, { isLoading: isLoadingUpdate }] =
        useUpdateProductMutation();
    const [removeProduct, { isLoading: isLoadingRemove }] =
        useRemoveProductMutation();

    const handleIncrease = () => {
        updateProduct({ id, amount: amount + 1 });
    };

    const handleDecrease = () => {
        updateProduct({ id, amount: amount - 1 });
    };

    const handleRemove = () => {
        removeProduct(id);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                mb: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <Box
                onClick={toggleDrawer('right', false)}
                component={RouterLink}
                to={`/product/${productId}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '70%',
                    mr: 2,
                    color: 'inherit',
                    textDecoration: 'none',
                }}>
                <CardMedia
                    component='img'
                    height='75px'
                    sx={{ maxWidth: '75px', borderRadius: 1 }}
                    image={thumbnail}
                    alt={title}
                />
                <Box sx={{ ml: 2 }}>
                    <Typography
                        sx={{ mb: 1, maxHeight: '48px', overflow: 'hidden' }}
                        variant='body1'>
                        {title}
                    </Typography>
                    <Typography variant='body2'>
                        {price}$ x {amount}
                    </Typography>
                    <Typography color='primary' variant='body1'>
                        {price * amount}$
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    onClick={handleDecrease}
                    disabled={isDisabled || isLoadingUpdate}
                    variant='contained'
                    size='small'
                    color='error'
                    startIcon={<RemoveIcon fontSize='inherit' />}
                    sx={{
                        minWidth: 'auto',
                        p: 1,
                        '& .MuiButton-startIcon': {
                            mr: 0,
                            ml: 0,
                        },
                    }}></Button>
                <Typography
                    sx={{ ml: 1.5, mr: 1.5 }}
                    align='center'
                    color='dark'
                    variant='body2'>
                    {amount}
                </Typography>

                <Button
                    onClick={handleIncrease}
                    disabled={isLoadingUpdate}
                    variant='contained'
                    size='small'
                    color='success'
                    startIcon={<AddIcon fontSize='inherit' />}
                    sx={{
                        minWidth: 'auto',
                        p: 1,
                        '& .MuiButton-startIcon': {
                            mr: 0,
                            ml: 0,
                        },
                    }}></Button>
            </Box>
            <IconButton
                onClick={handleRemove}
                disabled={isLoadingRemove}
                size='small'
                sx={{ ml: 1 }}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default CartItem;
