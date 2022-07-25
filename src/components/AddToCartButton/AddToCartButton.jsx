import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useLazyGetProductFromUserCartQuery,
    useAddProductMutation,
    useUpdateProductMutation,
} from '../../store/cartApi';
import { showDialog } from '../../store/materialUiSlice';

import { useSnackbar } from 'notistack';

import { Button, IconButton } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AddToCartButton = ({ productId, typeButton }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const [getProductFromUserCart] = useLazyGetProductFromUserCartQuery();
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const addProductToCart = async () => {
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
            {typeButton === 'icon' ? (
                <IconButton
                    disabled={loading}
                    onClick={addProductToCart}
                    size="large"
                >
                    <AddShoppingCartIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
            ) : (
                <Button
                    disabled={loading}
                    onClick={addProductToCart}
                    size="large"
                    variant="contained"
                    sx={{ width: '300px' }}
                >
                    Добавить в корзину
                </Button>
            )}
        </>
    );
};

export default React.memo(AddToCartButton);
