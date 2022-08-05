import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useToggleDrawer } from '../../hook/useToggleDrawer';

import { Button } from '@mui/material';

import { cartHOC } from './cartHOC';

const CheckoutButton = ({ cart, mt }) => {
    const toggleDrawer = useToggleDrawer();

    const handleClick = (e) => {
        sessionStorage.setItem('orderCart', JSON.stringify(cart));
        toggleDrawer('right', false)(e);
    };

    return (
        <Button
            onClick={handleClick}
            component={RouterLink}
            to="/checkout"
            disabled={cart?.totalCount < 1}
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