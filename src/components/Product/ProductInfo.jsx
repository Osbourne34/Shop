import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { materialUi, hideDialog } from '../../store/materialUiSlice';

import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';

import AddToCartButton from '../../components/AddToCartButton/AddToCartButton';

const ProductInfo = ({ title, brand, category, description, price, id }) => {
    const { isShowDialog } = useSelector(materialUi);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideDialog());
    };

    return (
        <>
            <Grid item xs={6}>
                <Typography color="text.primary" variant="h3" mb={3}>
                    {title}
                </Typography>
                <Typography
                    color="text.primary"
                    variant="h5"
                    sx={{ textTransform: 'capitalize' }}
                >
                    Brand: {brand}
                </Typography>
                <Typography
                    color="text.primary"
                    variant="h5"
                    mt={2}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Сategory: {category}
                </Typography>
                <Typography
                    color="text.primary"
                    mt={2}
                    sx={{ maxWidth: '450px' }}
                >
                    {description}
                </Typography>

                <Typography color="text.primary" variant="h4" sx={{ my: 4 }}>
                    ${price}
                </Typography>

                <AddToCartButton productId={id} />
            </Grid>

            <Dialog open={isShowDialog} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Для добавления товара в корзину необходимо
                        авторизоваться
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        sx={{ mr: 2 }}
                        variant="outlined"
                        onClick={handleClose}
                    >
                        Отмена
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="contained"
                        onClick={handleClose}
                    >
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductInfo;
