import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useToggleDrawer } from '../../hook/useToggleDrawer';

import { DRAWER_SIDE } from '../../constants/ui';

import { Button } from '@mui/material';

import { cartHOC } from './cartHOC';

const CheckoutButton = ({ cart, mt }) => {
    const toggleDrawer = useToggleDrawer();

    const handleClick = (e) => {
        sessionStorage.setItem('orderCart', JSON.stringify(cart));
        toggleDrawer(DRAWER_SIDE, false)(e);
    };

    return (
        <Button
            onClick={handleClick}
            component={RouterLink}
            to="/checkout"
            disabled={cart?.products.length < 1 || !cart}
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: mt ? mt : 0 }}
        >
            Оформить заказ
        </Button>
    );
};

export default cartHOC(React.memo(CheckoutButton));
