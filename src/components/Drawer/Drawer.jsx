import React from 'react';
import { useSelector } from 'react-redux';

import { useToggleDrawer } from '../../hook/useToggleDrawer';

import { Drawer as DrawerMui } from '@mui/material';

const Drawer = ({ children }) => {
    const { isShowDrawer } = useSelector((state) => state.materialUi);

    const toggleDrawer = useToggleDrawer();

    return (
        <DrawerMui
            anchor={'right'}
            open={isShowDrawer}
            onClose={toggleDrawer('right', false)}
        >
            {children}
        </DrawerMui>
    );
};

export default Drawer;
