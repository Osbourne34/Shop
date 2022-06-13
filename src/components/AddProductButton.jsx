import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog, showNotification } from './../store/materialUiSlice';
import {
    useAddProductMutation,
    useLazyGetProductsFromUserCartQuery,
    useUpdateProductMutation,
} from './../store/cartApi';

import { IconButton } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AddProductButton = ({ id, title, price, thumbnail, size }) => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [getProductsFromUserCart] = useLazyGetProductsFromUserCartQuery();

    const handleAddProduct = () => {
        if (user) {
            setIsLoading(true);
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
                        dispatch(showNotification());
                    });
                } else {
                    updateProduct({
                        id: product.id,
                        amount: product.amount + 1,
                    }).then(() => {
                        setIsLoading(false);
                        dispatch(showNotification());
                    });
                }
            });
        } else {
            dispatch(showDialog());
        }
    };

    return (
        <IconButton size={size} disabled={isLoading} onClick={handleAddProduct}>
            <AddShoppingCartIcon sx={{ fontSize: 'inherit' }} />
        </IconButton>
    );
};

export default AddProductButton;
