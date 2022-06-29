import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useInputValidate } from "../hook/useInputValidate";

import {
    Breadcrumbs,
    Link,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    TextField,
    Button,
    Box,
    Grid,
} from "@mui/material";

import OrderInfo from "../components/OrderInfo";

const PAY_BY_CART = "payByCart";
const CASH_PAYMENT = "cashPayment";

const Payment = () => {
    const [paymentType, setPaymentType] = useState(PAY_BY_CART);
    const [disabledBtn, setDisabledBtn] = useState(true);

    const numberCard = useInputValidate("");
    const expData = useInputValidate("");

    useEffect(() => {
        numberCard.error || expData.error
            ? setDisabledBtn(true)
            : setDisabledBtn(false);
    }, [numberCard.error, expData.error]);

    return (
        <>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    color="inherit"
                >
                    Главная
                </Link>
                <Typography color="text.primary">Оплата</Typography>
            </Breadcrumbs>

            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <FormControl fullWidth sx={{ color: "text.primary" }}>
                        <RadioGroup
                            defaultValue={PAY_BY_CART}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                sx={{ my: 3 }}
                                value={PAY_BY_CART}
                                control={
                                    <Radio
                                        onChange={(e) =>
                                            setPaymentType(e.target.value)
                                        }
                                    />
                                }
                                label="Оплата картой"
                            />

                            {paymentType === PAY_BY_CART && (
                                <Box sx={{ display: "flex" }}>
                                    <TextField
                                        sx={{ mr: 2 }}
                                        fullWidth
                                        label="Номер карты"
                                        variant="outlined"
                                        value={numberCard.value}
                                        onChange={numberCard.onChange}
                                        onBlur={numberCard.onBlur}
                                        error={
                                            numberCard.error && numberCard.blur
                                        }
                                        helperText={
                                            numberCard.error &&
                                            numberCard.blur &&
                                            "Заполните поле"
                                        }
                                    />
                                    <TextField
                                        fullWidth
                                        label="Срок карты"
                                        variant="outlined"
                                        value={expData.value}
                                        onChange={expData.onChange}
                                        onBlur={expData.onBlur}
                                        error={expData.error && expData.blur}
                                        helperText={
                                            expData.error &&
                                            expData.blur &&
                                            "Заполните поле"
                                        }
                                    />
                                </Box>
                            )}

                            <FormControlLabel
                                sx={{ my: 3 }}
                                value={CASH_PAYMENT}
                                control={
                                    <Radio
                                        onChange={(e) =>
                                            setPaymentType(e.target.value)
                                        }
                                    />
                                }
                                label="Оплата наличными"
                            />

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Button
                                    fullWidth
                                    component={RouterLink}
                                    to="/checkout"
                                    variant="outlined"
                                    size="large"
                                >
                                    К оформлению заказа
                                </Button>
                                <Button
                                    disabled={disabledBtn}
                                    sx={{ ml: 2 }}
                                    fullWidth
                                    color="success"
                                    variant="contained"
                                    size="large"
                                >
                                    Оформить заказ
                                </Button>
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <OrderInfo />
                </Grid>
            </Grid>
        </>
    );
};

export default Payment;
