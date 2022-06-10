import React from 'react';

import { Outlet } from 'react-router-dom';

import { Container, Drawer } from '@mui/material';

import Header from '../components/Header';
import Cart from '../components/Cart';

const Shop = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <Header toggleDrawer={toggleDrawer} />
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
                }}
                maxWidth='xl'>
                <Outlet />

                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}>
                    <Cart toggleDrawer={toggleDrawer} />
                </Drawer>
            </Container>
        </>
    );
};

export default Shop;
