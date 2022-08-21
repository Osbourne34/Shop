import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { materialUi, hideDialog } from '../../store/materialUiSlice';

import {
    Grid,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';

import ProductItem from './ProductItem';

const ProductsList = ({ products, row }) => {
    const { isShowDialog } = useSelector(materialUi);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideDialog());
    };

    return (
        <>
            <Grid container spacing={3}>
                {products.map((product) => {
                    return (
                        <Grid key={product.id} item xs={row}>
                            <ProductItem {...product} />
                        </Grid>
                    );
                })}
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

export default ProductsList;
