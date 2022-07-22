import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetUserCartQuery } from './../../store/cartApi';

const Cart = ({ Component }) => {
    const { user } = useSelector((state) => state.auth);
    const [getUserCart, { data: cart, isError }] = useLazyGetUserCartQuery();

    useEffect(() => {
        if (user) {
            getUserCart(user.id);
        }
    }, [user, getUserCart]);

    return <Component cart={cart} error={isError} />;
};

export default Cart;
