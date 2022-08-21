import React, { useState, useEffect, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useInput } from '../../hook/useInput';
import { empty } from '../../utils/validateUtils';

import { EMPTY_ERROR } from '../../constants/messages';
import { DELIVERY, TAKE_WITH_ME } from '../../constants/ui';

import {
    Box,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Radio,
    FormControl,
    RadioGroup,
    Paper,
} from '@mui/material';

const CheckoutForm = () => {
    const formData = JSON.parse(sessionStorage.getItem('orderInfo'));
    const userData = JSON.parse(localStorage.getItem('user'));

    const transformFullName = useMemo(() => {
        return userData.firstName
            ? userData.firstName + ' ' + userData.lastName
            : '';
    }, []);

    const [deliveryType, setDeliveryType] = useState(
        formData?.deliveryType || DELIVERY,
    );

    const fullName = useInput(empty, formData?.fullName || transformFullName);
    const phone = useInput(empty, formData?.phone || userData?.phone);

    const city = useInput(empty, formData?.city);
    const street = useInput(empty, formData?.street);
    const house = useInput(empty, formData?.house);
    const zipCode = useInput(empty, formData?.zipCode);

    useEffect(() => {
        if (deliveryType === TAKE_WITH_ME) {
            city.clearValue();
            street.clearValue();
            house.clearValue();
            zipCode.clearValue();
        }
    }, [deliveryType]);

    const handleSubmit = () => {
        if (deliveryType === DELIVERY) {
            sessionStorage.setItem(
                'orderInfo',
                JSON.stringify({
                    fullName: fullName.value,
                    phone: phone.value,
                    deliveryType,
                    city: city.value,
                    street: street.value,
                    house: house.value,
                    zipCode: zipCode.value,
                }),
            );
        } else {
            sessionStorage.setItem(
                'orderInfo',
                JSON.stringify({
                    fullName: fullName.value,
                    phone: phone.value,
                    deliveryType,
                }),
            );
        }
    };

    let isValidForm = false;

    if (deliveryType === TAKE_WITH_ME) {
        if (fullName.hasError || phone.hasError) {
            isValidForm = false;
        } else isValidForm = true;
    } else {
        if (
            fullName.hasError ||
            phone.hasError ||
            city.hasError ||
            street.hasError ||
            house.hasError ||
            zipCode.hasError
        ) {
            isValidForm = false;
        } else isValidForm = true;
    }

    return (
        <>
            <Paper sx={{ mb: 4, p: 2, boxShadow: 5 }}>
                <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                    Личные данные
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        value={fullName.value}
                        onChange={fullName.onChange}
                        onBlur={fullName.onBlur}
                        error={fullName.errorForView}
                        helperText={fullName.errorForView && EMPTY_ERROR}
                        label="Имя и фамилия"
                        fullWidth
                        required
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        value={phone.value}
                        onChange={phone.onChange}
                        onBlur={phone.onBlur}
                        error={phone.errorForView}
                        helperText={phone.errorForView && EMPTY_ERROR}
                        label="Номер телефона"
                        fullWidth
                        required
                        sx={{ ml: 1 }}
                    />
                </Box>
            </Paper>

            <Paper sx={{ p: 2, boxShadow: 5 }}>
                <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                    Тип доставки
                </Typography>
                <FormControl sx={{ display: 'flex' }}>
                    <RadioGroup
                        value={deliveryType}
                        onChange={(e) => setDeliveryType(e.target.value)}
                    >
                        <FormControlLabel
                            value={DELIVERY}
                            label="Доставка"
                            control={<Radio />}
                            sx={{ color: 'text.primary', mb: 2 }}
                        />

                        {deliveryType === DELIVERY && (
                            <>
                                <Box sx={{ display: 'flex', mb: 2 }}>
                                    <TextField
                                        value={city.value}
                                        onChange={city.onChange}
                                        onBlur={city.onBlur}
                                        error={city.errorForView}
                                        helperText={
                                            city.errorForView && EMPTY_ERROR
                                        }
                                        label="Город"
                                        required
                                        fullWidth
                                        sx={{ mr: 1 }}
                                    />
                                    <TextField
                                        value={street.value}
                                        onChange={street.onChange}
                                        onBlur={street.onBlur}
                                        error={street.errorForView}
                                        helperText={
                                            street.errorForView && EMPTY_ERROR
                                        }
                                        label="Улица / Микрорайон"
                                        required
                                        fullWidth
                                        sx={{ ml: 1 }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <TextField
                                        value={house.value}
                                        onChange={house.onChange}
                                        onBlur={house.onBlur}
                                        error={house.errorForView}
                                        helperText={
                                            house.errorForView && EMPTY_ERROR
                                        }
                                        label="Дом"
                                        required
                                        fullWidth
                                        sx={{ mr: 1 }}
                                    />
                                    <TextField
                                        value={zipCode.value}
                                        onChange={zipCode.onChange}
                                        onBlur={zipCode.onBlur}
                                        error={zipCode.errorForView}
                                        helperText={
                                            zipCode.errorForView && EMPTY_ERROR
                                        }
                                        label="Почтовый индекс"
                                        required
                                        fullWidth
                                        sx={{ ml: 1 }}
                                    />
                                </Box>
                            </>
                        )}

                        <FormControlLabel
                            value={TAKE_WITH_ME}
                            label="Забрать из магазина"
                            control={<Radio />}
                            sx={{ color: 'text.primary', mt: 2 }}
                        />
                    </RadioGroup>
                </FormControl>
            </Paper>

            <Box sx={{ display: 'flex', mt: 4 }}>
                <Button
                    component={RouterLink}
                    to="/cart"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ mr: 1 }}
                >
                    Вернуться в корзину
                </Button>
                <Button
                    onClick={handleSubmit}
                    component={RouterLink}
                    to="/payment"
                    disabled={!isValidForm}
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ ml: 1 }}
                >
                    Перейти к оплате
                </Button>
            </Box>
        </>
    );
};

export default CheckoutForm;
