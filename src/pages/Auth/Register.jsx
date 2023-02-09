import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../store/authSlice';

import { useRegisterMutation } from './../../store/authApi';

import { Container } from '@mui/material';

import AuthForm from './AuthForm';

const Registration = () => {
    const { user } = useSelector(auth);

    const navigate = useNavigate();
    const [register, { isLoading, error }] = useRegisterMutation();

    const handleRegister = async (body) => {
        const { data } = await register(body);

        if (data) navigate('/login');
    };

    if (user?.role === 'ADMIN') {
        return <Navigate to="/admin" replace={true} />;
    }

    if (user) {
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
                title={'Регистрация'}
                textHelper={'Есть аккаунт?'}
                linkHelper={{ text: 'Войти', link: '/login' }}
                textButton="Регистрация"
                auth={handleRegister}
                error={error?.data || error?.error}
                loading={isLoading}
            />
        </Container>
    );
};

export default Registration;
