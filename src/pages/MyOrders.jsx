import React from 'react';

import Head from '../components/UserDashboard/Head';
import OrderList from '../components/UserDashboard/OrderList';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const MyOrders = () => {
    return (
        <>
            <Head Icon={ShoppingBagOutlinedIcon} title="Мой заказы" />
            <OrderList />
        </>
    );
};

export default MyOrders;
