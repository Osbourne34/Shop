import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog } from '../../store/materialUiSlice';

import {
    useLazyGetUserCartQuery,
    useCreateCartAndAndProductMutation,
    useUpdateCartMutation,
} from '../../store/cartApi';
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
        setLoading(true);
        if (user) {
            const { data: cart, error } = await getUserCart(user.id);
            if (error) {
                enqueueSnackbar('Произошла ошибка', {
                    variant: 'error',
                });
                setLoading(false);
                return;
            }
            console.log(cart);
            if (!cart?.id) {
                const { data: product, error } = await getProduct(productId);

                if (error) {
                    enqueueSnackbar('Произошла ошибка', {
                        variant: 'error',
                    });
                    setLoading(false);
                    return;
                }

                const newCart = {
                    userId: user.id,
                    products: [{ ...product, amount: 1 }],
                };

                await createCartAndAddProduct(newCart);

                enqueueSnackbar('Товар добавлен в корзину', {
                    variant: 'success',
                });
                setLoading(false);
            } else {
                const product = cart.products.find(
                    (item) => item.id === productId
                );
                if (product) {
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
                        enqueueSnackbar('Произошла ошибка', {
                            variant: 'error',
                        });
                        setLoading(false);
                        return;
                    }

                    enqueueSnackbar('Товар добавлен в корзину', {
                        variant: 'success',
                    });
                    setLoading(false);
                } else {
                    const { data: product, error } = await getProduct(
                        productId
                    );

                    if (error) {
                        enqueueSnackbar('Произошла ошибка', {
                            variant: 'error',
                        });
                        setLoading(false);
                        return;
                    }

                    await updateCart({
                        id: cart.id,
                        products: [...cart.products, { ...product, amount: 1 }],
                    });

                    enqueueSnackbar('Товар добавлен в корзину', {
                        variant: 'success',
                    });
                    setLoading(false);
                }
            }
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
