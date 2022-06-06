import React from 'react';

import { Container } from '@mui/material';

import Header from '../components/Header';
import GoodsList from '../components/GoodsList';

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
                }}
                maxWidth='xl'>
                <GoodsList />
            </Container>
        </>
    );
};

export default Shop;
