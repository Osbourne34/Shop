import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import DrawerMui from '../components/Drawer/DrawerMui';
import CartForDrawer from '../components/Cart/CartForDrawer/CartForDrawer';
import Categories from '../components/Categories/Categories';

const Shop = () => {
    return (
        <>
            <Header />
            <Container
                sx={{
                    '&:before': {
                        content: "' '",
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'background.default',
                        zIndex: '-1',
                    },
                    mt: 13,
                    mb: 5,
                }}
                maxWidth="xl"
            >
                <Categories />
                <Outlet />

                <DrawerMui>
                    <CartForDrawer />
                </DrawerMui>
                <Modal />
            </Container>
        </>
    );
};

export default Shop;
