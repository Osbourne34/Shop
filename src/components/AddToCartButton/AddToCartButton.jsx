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

import { PRODUCT_ADDED_TO_CART } from '../../constants/messages';
import { ERROR_CART } from '../../constants/messages';

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
            const { data: cart, error } = await getUserCart(user.id);

            if (error) {
                enqueueSnackbar(ERROR_CART, {
                    variant: 'error',
                });
                setLoading(false);
                return;
            }

            if (!cart?.id) {
                const { data: product, error } = await getProduct(productId);

                if (error) {
                    enqueueSnackbar(ERROR_CART, {
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

                enqueueSnackbar(PRODUCT_ADDED_TO_CART, {
                    variant: 'success',
                });
                setLoading(false);
            } else {
                const product = cart.products.find(
                    (item) => item.id === productId,
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
                        enqueueSnackbar(ERROR_CART, {
                            variant: 'error',
                        });
                        setLoading(false);
                        return;
                    }

                    enqueueSnackbar(PRODUCT_ADDED_TO_CART, {
                        variant: 'success',
                    });
                    setLoading(false);
                } else {
                    const { data: product, error } = await getProduct(
                        productId,
                    );

                    if (error) {
                        enqueueSnackbar(ERROR_CART, {
                            variant: 'error',
                        });
                        setLoading(false);
                        return;
                    }

                    await updateCart({
                        id: cart.id,
                        products: [...cart.products, { ...product, amount: 1 }],
                    });

                    enqueueSnackbar(PRODUCT_ADDED_TO_CART, {
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
