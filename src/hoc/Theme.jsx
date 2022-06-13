import React, { useState, useMemo, createContext } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
export const ColorModeContext = createContext();

const Theme = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
                localStorage.setItem(
                    'theme',
                    mode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [mode],
    );

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
            },
        });
    }, [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Theme;
