import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import Header from '../Header/Header';

const Layout = ({ children }) => {
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
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
