import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation, useSigninMutation } from '../store/authApi';
import { setUser } from './../store/authSlice';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import {
    Box,
    Container,
    TextField,
    Typography,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Button,
    Link,
    Alert,
    Backdrop,
    CircularProgress,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const Auth = () => {
    const dispatch = useDispatch();
    const [register, registerValues] = useRegisterMutation();
    const [signin, singinValues] = useSigninMutation();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isLogin = pathname.includes('/login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        clearInputs();
        setShowPassword(false);
        setError('');
    }, [pathname]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            signin({
                email,
                password,
            }).then((res) => {
                if (res.data) {
                    navigate('/');
                    dispatch(setUser(res.data.user));
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                } else {
                    setError(res.error.data);
                }
            });
        } else {
            register({
                email,
                password,
                role: 'user',
            }).then((res) => {
                if (res.data) navigate('/login');
                else {
                    setError(res.error.data);
                }
            });
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container
            maxWidth='sm'
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                '&:before': {
                    content: "' '",
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'background.default',
                },
            }}>
            <Box
                onSubmit={handleSubmit}
                component='form'
                borderColor='grey.400'
                sx={{
                    flexGrow: 1,
                    p: 2,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    position: 'relative',
                }}>
                <IconButton
                    onClick={() => navigate(-1)}
                    size='large'
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 10,
                        backgroundColor: 'background.default',
                        zIndex: 1,
                    }}>
                    <ArrowBackRoundedIcon />
                </IconButton>

                <Typography
                    variant='h4'
                    component='h4'
                    textAlign='center'
                    sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {isLogin ? 'Авторизация' : 'Cоздание аккаунта'}
                </Typography>

                {error && (
                    <Alert sx={{ mt: 2 }} variant='filled' severity='error'>
                        {error}
                    </Alert>
                )}

                <TextField
                    label='E-mail'
                    type='email'
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    sx={{ mt: 3 }}
                />

                <FormControl fullWidth variant='outlined' sx={{ mt: 3 }}>
                    <InputLabel htmlFor='outlined-adornment-password'>
                        Пароль *
                    </InputLabel>
                    <OutlinedInput
                        id='outlined-adornment-password'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                            if (e.target.value.length >= 4)
                                setIsDisabled(false);
                            else setIsDisabled(true);
                            setPassword(e.target.value);
                        }}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge='end'>
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Пароль'
                        required
                    />
                </FormControl>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 3,
                        mb: 3,
                    }}>
                    <Typography sx={{ mr: 1, color: 'text.primary' }}>
                        {isLogin ? 'Нету аккаунта?' : 'Есть аккаунт?'}
                    </Typography>
                    <Link
                        variant='body1'
                        component={RouterLink}
                        to={isLogin ? '/register' : '/login'}>
                        {isLogin ? 'Создать аккаунт' : 'Войти'}
                    </Link>
                </Box>

                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    fullWidth
                    disabled={isDisabled}>
                    {isLogin ? 'Войти' : 'Создать аккаунт'}
                </Button>
            </Box>

            {registerValues.isLoading ||
                (singinValues.isLoading && (
                    <Backdrop
                        sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={true}>
                        <CircularProgress color='inherit' />
                    </Backdrop>
                ))}
        </Container>
    );
};

export default Auth;
