import React, { useContext } from 'react';

import { ColorModeContext } from '../../theme/Theme';

import { IconButton } from '@mui/material';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeModeToggler = () => {
    const { mode, themeModeToggle } = useContext(ColorModeContext);

    return (
        <IconButton onClick={themeModeToggle} color="inherit">
            {mode !== 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
};

export default ThemeModeToggler;
