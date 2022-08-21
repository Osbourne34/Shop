import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../store/authSlice';
import { updateUser as updateUserLocal } from '../../store/authSlice';
import { useUpdateUserMutation } from '../../store/usersApi';

import { useInput, useValidForm } from '../../hook/useInput';
import { empty, email as emailValidate } from '../../utils/validateUtils';

import { useSnackbar } from 'notistack';

import {
    EMPTY_ERROR,
    ERROR_ON_CHANGE,
    PROFILE_CHANGED,
} from '../../constants/messages';

import { Paper, TextField } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

const UserEditForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(auth);

    const { enqueueSnackbar } = useSnackbar();

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const firstName = useInput(empty, user.firstName || '');
    const lastName = useInput(empty, user.lastName || '');
    const email = useInput(emailValidate, user.email || '');
    const phone = useInput(empty, user.phone || '');

    const isValidForm = useValidForm(
        firstName.hasError,
        lastName.hasError,
        email.hasError,
        phone.hasError,
    );

    const handleSubmit = async () => {
        const { data, error } = await updateUser({
            userId: user.id,
            body: {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                phone: phone.value,
            },
        });

        if (error) {
            enqueueSnackbar(ERROR_ON_CHANGE, {
                variant: 'error',
            });
            return;
        }

        dispatch(updateUserLocal(data));
        localStorage.setItem('user', JSON.stringify(data));
        enqueueSnackbar(PROFILE_CHANGED, {
            variant: 'success',
        });
    };

    return (
        <Paper
            sx={{
                boxShadow: 5,
                p: 2,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}
        >
            <TextField
                value={firstName.value}
                onChange={firstName.onChange}
                onBlur={firstName.onBlur}
                error={firstName.errorForView}
                helperText={firstName.errorForView && EMPTY_ERROR}
                required
                label="Имя"
                sx={{ width: 'calc(50% - 8px)' }}
            />
            <TextField
                value={lastName.value}
                onChange={lastName.onChange}
                onBlur={lastName.onBlur}
                error={lastName.errorForView}
                helperText={lastName.errorForView && EMPTY_ERROR}
                required
                label="Фамилия"
                sx={{ width: 'calc(50% - 8px)' }}
            />
            <TextField
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                error={email.errorForView}
                helperText={email.errorForView && EMPTY_ERROR}
                required
                label="Email"
                type="email"
                sx={{ width: 'calc(50% - 8px)', mt: 2 }}
            />
            <TextField
                value={phone.value}
                onChange={phone.onChange}
                onBlur={phone.onBlur}
                error={phone.errorForView}
                helperText={phone.errorForView && EMPTY_ERROR}
                required
                label="Номер телефона"
                type="tel"
                sx={{ width: 'calc(50% - 8px)', mt: 2 }}
            />

            <LoadingButton
                onClick={handleSubmit}
                loading={isLoading}
                variant="contained"
                disabled={
                    (user.email === email.value &&
                        user.firstName === firstName.value &&
                        user.lastName === lastName.value &&
                        user.phone === phone.value) ||
                    !isValidForm
                }
                size="large"
                sx={{ mt: 4 }}
            >
                Сохранить изменения
            </LoadingButton>
        </Paper>
    );
};

export default UserEditForm;
