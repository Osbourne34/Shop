import React from 'react';
import { useSelector } from 'react-redux';
import { materialUi } from '../../store/materialUiSlice';

import { useToggleDrawer } from '../../hook/useToggleDrawer';

import { Drawer as DrawerMui } from '@mui/material';

const Drawer = ({ children, anchor }) => {
    const { isShowDrawer } = useSelector(materialUi);

    const toggleDrawer = useToggleDrawer();

    return (
        <DrawerMui
            anchor={anchor}
            open={isShowDrawer}
            onClose={toggleDrawer(anchor, false)}
        >
            {children}
        </DrawerMui>
    );
};

export default Drawer;
