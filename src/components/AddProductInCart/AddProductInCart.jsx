import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useLazyGetProductFromUserCartQuery,
    useAddProductMutation,
    useUpdateProductMutation,
} from './../../store/cartApi';
import { showDialog } from '../../store/materialUiSlice';

import { useSnackbar } from 'notistack';

import { IconButton } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AddProductInCart = ({ productId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const [getProductFromUserCart] = useLazyGetProductFromUserCartQuery();
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const addingProductToCart = async () => {
        if (user) {
            setLoading(true);
            try {
                const { data } = await getProductFromUserCart({
                    productId,
                    userId: user.id,
                });
                if (data.length > 0) {
                    updateProduct({
                        id: data[0].id,
                        amount: data[0].amount + 1,
                    })
                        .then(() => {
                            enqueueSnackbar('Товар добавлен в корзину', {
                                variant: 'success',
                            });
                        })
                        .catch((err) => {
                            enqueueSnackbar(
                                'Не удалось добавить товар в корзину',
                                {
                                    variant: 'error',
                                },
                            );
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else {
                    addProduct({
                        productId,
                        userId: user.id,
                        amount: 1,
                    })
                        .then(() => {
                            enqueueSnackbar('Товар добавлен в корзину', {
                                variant: 'success',
                            });
                        })
                        .catch((err) => {
                            enqueueSnackbar(
                                'Не удалось добавить товар в корзину',
                                {
                                    variant: 'error',
                                },
                            );
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
            } catch (err) {
                enqueueSnackbar('Не удалось добавить товар в корзину', {
                    variant: 'error',
                });
            } finally {
                setLoading(false);
            }
        } else {
            dispatch(showDialog());
        }
    };

    return (
        <>
            <IconButton
                disabled={loading}
                onClick={addingProductToCart}
                size="large"
            >
                <AddShoppingCartIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>
        </>
    );
};

export default React.memo(AddProductInCart);
