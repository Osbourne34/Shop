import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog } from '../../store/materialUiSlice';

import {
    useLazyGetUserCartQuery,
    useCreateCartAndAndProductMutation,
    useUpdateCartMutation,
} from '../../store/cartApi2';
import { useLazyGetProductQuery } from '../../store/productsApi';

import { useSnackbar } from 'notistack';

import { Button, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AddToCartButton = ({ productId, typeButton }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const [getUserCart] = useLazyGetUserCartQuery();
    const [createCartAndAddProduct] = useCreateCartAndAndProductMutation();
    const [getProduct] = useLazyGetProductQuery();
    const [updateCart] = useUpdateCartMutation();

    const addProductToCart = async () => {
        if (user) {
            setLoading(true);
            getUserCart(user.id)
                .then(async ({ data: cart }) => {
                    if (!cart) {
                        const { data: product } = await getProduct(productId);
                        await createCartAndAddProduct({
                            products: [{ product, amount: 1 }],
                            userId: user.id,
                        });
                        enqueueSnackbar('Товар добавлен', {
                            variant: 'success',
                        });
                        setLoading(false);
                        // CREATE AND ADD PRODUCT
                    } else {
                        const product = cart.products.find(
                            ({ product }) => product.id === productId,
                        );
                        if (!product) {
                            const { data: product } = await getProduct(
                                productId,
                            );
                            await updateCart({
                                products: [
                                    ...cart.products,
                                    { product, amount: 1 },
                                ],
                                id: cart.id,
                            });
                            setLoading(false);
                            enqueueSnackbar('Товар добавлен', {
                                variant: 'success',
                            });
                            // ADD NEW PRODUCT
                        } else {
                            const newProducts = cart.products.map(
                                ({ amount, product }) => {
                                    if (product.id === productId) {
                                        return { product, amount: amount + 1 };
                                    }
                                    return { product, amount };
                                },
                            );
                            updateCart({
                                products: newProducts,
                                id: cart.id,
                            });
                            setLoading(false);
                            enqueueSnackbar('Товар добавлен', {
                                variant: 'success',
                            });
                            // UPDATE AMOUNT
                        }
                    }
                })
                .catch((e) => {
                    enqueueSnackbar('Ошибка при добавлений товара', {
                        variant: 'error',
                    });
                    setLoading(false);
                });
        } else {
            dispatch(showDialog());
        }
    };

    return (
        <>
            {typeButton === 'icon' ? (
                <IconButton
                    onClick={addProductToCart}
                    disabled={loading}
                    size="large"
                >
                    <AddShoppingCartIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
            ) : (
                <Button
                    onClick={addProductToCart}
                    disabled={loading}
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
