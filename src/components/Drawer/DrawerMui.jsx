import React from 'react';
import { useSelector } from 'react-redux';

import { useToggleDrawer } from './../../hook/useToggleDrawer';

import { Drawer } from '@mui/material';

const DrawerMui = ({ children }) => {
    const { isShowDrawer } = useSelector((state) => state.materialUi);

    const toggleDrawer = useToggleDrawer();

    return (
        <Drawer
            anchor={'right'}
            open={isShowDrawer}
            onClose={toggleDrawer('right', false)}
        >
            {children}
        </Drawer>
    );
};

export default DrawerMui;
