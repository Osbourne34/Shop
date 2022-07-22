import React, { useState, createContext } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
export const ColorModeContext = createContext();

const Theme = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

    const themeModeToggle = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
    };

    const theme = createTheme({
        palette: {
            mode,
        },
    });

    return (
        <ColorModeContext.Provider value={{ mode, themeModeToggle }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Theme;
