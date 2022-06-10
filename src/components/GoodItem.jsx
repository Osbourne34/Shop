import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
    useAddProductMutation,
    useLazyGetProductsFromUserCartQuery,
    useUpdateProductMutation,
} from './../store/cartApi';

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Box,
} from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const GoodItem = ({
    id,
    title,
    description,
    price,
    thumbnail,
    handleClickOpenDialog,
    setOpenAdding,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [getProductsFromUserCart] = useLazyGetProductsFromUserCartQuery();

    const handleAddProduct = () => {
        setIsLoading(true);
        if (user) {
            getProductsFromUserCart(user.id).then(({ data }) => {
                const { cart } = data;
                const product = cart.find((item) => item.productId === id);

                if (!product) {
                    addProduct({
                        userId: user.id,
                        productId: id,
                        title,
                        price,
                        thumbnail,
                        amount: 1,
                    }).then(() => {
                        setIsLoading(false);
                        setOpenAdding(true);
                    });
                } else {
                    updateProduct({
                        id: product.id,
                        amount: product.amount + 1,
                    }).then(() => {
                        setIsLoading(false);
                        setOpenAdding(true);
                    });
                }
            });
        } else {
            handleClickOpenDialog(true);
        }
    };

    return (
        <>
            <Card sx={{ boxShadow: 5 }}>
                <Box
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                    component={RouterLink}
                    to={`/product/${id}`}>
                    <CardMedia
                        component='img'
                        height='200'
                        image={thumbnail}
                        alt={title}
                    />
                    <CardContent>
                        <Typography variant='h5'>{price} $</Typography>
                        <Typography
                            sx={{ textTransform: 'capitalize' }}
                            noWrap
                            gutterBottom
                            variant='h6'
                            component='div'>
                            {title}
                        </Typography>
                        <Typography
                            sx={{ height: '60px', overflow: 'hidden' }}
                            variant='body2'
                            color='text.secondary'>
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton disabled={isLoading} onClick={handleAddProduct}>
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
};

export default GoodItem;
