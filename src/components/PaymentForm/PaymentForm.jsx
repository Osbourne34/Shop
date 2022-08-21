import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../store/authSlice';
import { useOrderCreateMutation } from '../../store/orderApi';
import { useClearCartMutation } from '../../store/cartApi';

import { useInput, useValidForm } from '../../hook/useInput';
import { empty } from '../../utils/validateUtils';

import { EMPTY_ERROR } from '../../constants/messages';
import { CARD, CASH } from '../../constants/ui';

import {
    Paper,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Box,
    Button,
    Dialog,
} from '@mui/material';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import LoadingButton from '@mui/lab/LoadingButton';

const PaymentForm = () => {
    const { user } = useSelector(auth);
    const [showDialog, setShowDialog] = useState(false);
    const [paymentType, setPaymentType] = useState(CARD);

    const [orderCreate, { isLoading, error }] = useOrderCreateMutation();
    const [clearCart] = useClearCartMutation();

    const cardNumber = useInput(empty);
    const cardData = useInput(empty);

    const isValidForm = useValidForm(cardNumber.hasError, cardData.hasError);

    useEffect(() => {
        if (paymentType === CASH) {
            cardNumber.clearValue();
            cardData.clearValue();
        }
    }, [paymentType]);

    const handleOrder = async () => {
        const { products, totalPrice, totalCount, id } = JSON.parse(
            sessionStorage.getItem('orderCart'),
        );
        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
        const payment =
            paymentType === CARD
                ? {
                      paymentType,
                      cardNumber: cardNumber.value,
                      cardData: cardData.value,
                  }
                : { paymentType };
        await orderCreate({
            products,
            totalPrice,
            totalCount,
            orderInfo,
            payment,
            status: 'pending',
            userId: user.id,
            user,
        });
        await clearCart(id);

        setShowDialog(true);
        sessionStorage.clear();
    };

    return (
        <>
            <Paper sx={{ p: 2, boxShadow: 5 }}>
                <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                    Выберите тип оплаты
                </Typography>

                <FormControl sx={{ display: 'flex' }}>
                    <RadioGroup
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        <FormControlLabel
                            value={CARD}
                            label="Оплата картой"
                            control={<Radio />}
                            sx={{ color: 'text.primary', mb: 2 }}
                        />

                        {paymentType === CARD && (
                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <TextField
                                    value={cardNumber.value}
                                    onChange={cardNumber.onChange}
                                    onBlur={cardNumber.onBlur}
                                    error={cardNumber.errorForView}
                                    helperText={
                                        cardNumber.errorForView && EMPTY_ERROR
                                    }
                                    label="Номер карты"
                                    required
                                    fullWidth
                                    sx={{ mr: 1 }}
                                />
                                <TextField
                                    value={cardData.value}
                                    onChange={cardData.onChange}
                                    onBlur={cardData.onBlur}
                                    error={cardData.errorForView}
                                    helperText={
                                        cardData.errorForView && EMPTY_ERROR
                                    }
                                    label="Дата"
                                    required
                                    fullWidth
                                    sx={{ ml: 1 }}
                                />
                            </Box>
                        )}

                        <FormControlLabel
                            value={CASH}
                            label="Оплата наличными"
                            control={<Radio />}
                            sx={{ color: 'text.primary', mt: 2 }}
                        />
                    </RadioGroup>
                </FormControl>
            </Paper>

            <Box sx={{ display: 'flex', mt: 4 }}>
                <Button
                    component={RouterLink}
                    to="/checkout"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ mr: 1 }}
                >
                    Вернуться к оформлению заказа
                </Button>
                <LoadingButton
                    onClick={handleOrder}
                    loading={isLoading}
                    variant="contained"
                    disabled={!(isValidForm || paymentType === CASH)}
                    fullWidth
                >
                    Заказать
                </LoadingButton>
            </Box>

            <Dialog open={showDialog}>
                {error && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 4,
                        }}
                    >
                        <ErrorRoundedIcon
                            color="error"
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography
                            variant="h5"
                            textAlign="center"
                            color="text.primary"
                            sx={{ mb: 2 }}
                        >
                            Ошибка
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setShowDialog(false)}
                        >
                            Попробовать снова
                        </Button>
                    </Box>
                )}
                {!isLoading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 4,
                        }}
                    >
                        <CheckCircleRoundedIcon
                            color="success"
                            sx={{ width: 80, height: 80 }}
                        />
                        <Typography sx={{ my: 2 }} variant="h5">
                            Ваш заказ успешно оформлен!
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Button
                                component={RouterLink}
                                to="/"
                                variant="outlined"
                                onClick={() => setShowDialog(false)}
                                sx={{ mr: 2 }}
                            >
                                На главную
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/profile/orders"
                                variant="contained"
                                onClick={() => setShowDialog(false)}
                            >
                                Посмотреть заказы
                            </Button>
                        </Box>
                    </Box>
                )}
            </Dialog>
        </>
    );
};

export default PaymentForm;
