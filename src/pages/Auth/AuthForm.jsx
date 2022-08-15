import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useInput, useValidForm } from './../../hook/useInput';
import {
    email as emailValidate,
    password as passwordValidate,
} from '../../utils/validateUtils';

import { formErrorMessages } from '../../constants/messages';

import {
    Box,
    Button,
    IconButton,
    Typography,
    Alert,
    TextField,
    Link,
} from '@mui/material';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import Loader from './Loader';

const AuthForm = ({
    title,
    textHelper,
    linkHelper,
    textButton,
    auth,
    loading,
    error,
}) => {
    const email = useInput(emailValidate);
    const password = useInput(passwordValidate);
    const isValidForm = useValidForm(email.hasError, password.hasError);

    const onSubmitForm = (e) => {
        e.preventDefault();

        auth({
            email: email.value,
            password: password.value,
        });
    };

    return (
        <Box
            onSubmit={onSubmitForm}
            component="form"
            sx={{
                position: 'relative',
                width: '100%',
                p: 2,
                borderColor: 'text.secondary',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 2,
            }}
        >
            <IconButton
                component={RouterLink}
                to="/"
                size="large"
                sx={{
                    position: 'absolute',
                    top: 10,
                    left: 16,
                    backgroundColor: 'background.default',
                    zIndex: 1,
                }}
            >
                <ArrowBackRoundedIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>

            <Typography
                variant="h4"
                component="h4"
                textAlign="center"
                sx={{ fontWeight: 500, color: 'text.primary', mb: 3 }}
            >
                {title}
            </Typography>

            {error && (
                <Alert variant="filled" severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <TextField
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                error={email.errorForView}
                helperText={
                    email.errorForView && formErrorMessages.INVALID_EMAIL
                }
                label="E-mail"
                type="email"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
            />

            <TextField
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
                error={password.errorForView}
                helperText={
                    password.errorForView && formErrorMessages.PASSWORD_ERROR
                }
                label="Пароль"
                type="password"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                <Typography sx={{ mr: 1, color: 'text.primary' }}>
                    {textHelper}
                </Typography>
                <Link
                    component={RouterLink}
                    to={linkHelper.link}
                    variant="body1"
                >
                    {linkHelper.text}
                </Link>
            </Box>

            <Button
                disabled={!isValidForm}
                type="submit"
                variant="contained"
                size="large"
                fullWidth
            >
                {textButton}
            </Button>

            {loading && <Loader />}
        </Box>
    );
};

export default AuthForm;
