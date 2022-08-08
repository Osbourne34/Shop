import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetUserCartQuery } from '../../store/cartApi';

export const cartHOC = (Component) => {
    return (props) => {
        const { user } = useSelector((state) => state.auth);
        const [getUserCart, { data: cart, error }] = useLazyGetUserCartQuery();
        useEffect(() => {
            if (user) {
                getUserCart(user.id);
            }
        }, [user, getUserCart]);
        return <Component cart={cart} error={error} {...props} />;
    };
};
