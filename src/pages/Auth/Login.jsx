import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useLoginMutation } from './../../store/authApi';
import { updateUser } from '../../store/authSlice';

import { Container } from '@mui/material';

import AuthForm from './AuthForm';

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.user);

    const navigate = useNavigate();
    const [login, { isLoading, error }] = useLoginMutation();

    const handleLogin = async (body) => {
        const { data } = await login(body);

        if (data) {
            dispatch(updateUser(data.user));
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Container
            maxWidth="sm"
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
            }}
        >
            <AuthForm
                title={'Авторизация'}
                textHelper={'Нету аккаунта?'}
                linkHelper={{ text: 'Создать аккаунт', link: '/register' }}
                textButton="Войти"
                auth={handleLogin}
                error={error?.data || error?.error}
                loading={isLoading}
            />
        </Container>
    );
};

export default Login;
