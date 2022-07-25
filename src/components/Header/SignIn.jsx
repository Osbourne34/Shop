import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

const SignIn = () => {
    return (
        <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="inherit"
            sx={{ ml: 2 }}
        >
            Войти
        </Button>
    );
};

export default SignIn;
