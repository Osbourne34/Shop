import React from 'react';

import { Outlet } from 'react-router-dom';

import { DRAWER_SIDE } from '../constants/ui';

import Modal from '../components/Modal/Modal';
import Drawer from '../components/Drawer/Drawer';
import CartForDrawer from '../components/Cart/CartForDrawer/CartForDrawer';
import Categories from '../components/Categories/Categories';

const Shop = () => {
    return (
        <>
            <Categories />

            <Outlet />

            <Drawer anchor={DRAWER_SIDE}>
                <CartForDrawer />
            </Drawer>
            <Modal />
        </>
    );
};

export default Shop;
