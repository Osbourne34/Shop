import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { setOrderDetails } from "./../store/orderSlice";

import { useInputValidate } from "../hook/useInputValidate";

import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Button,
    Typography,
} from "@mui/material";

const DELIVERY = "delivery";
const TAKE_WITH_ME = "takeWithMe";

const CheckoutForm = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkoutFormData = useSelector((state) => state.order);

    const [fieldValidation, setFieldValidation] = useState(true);
    const [deliveryType, setDeliveryType] = useState(
        checkoutFormData.deliveryType,
    );

    const [additionally, setAdditionally] = useState(
        checkoutFormData.additionally,
    );

    const fullName = useInputValidate(checkoutFormData.fullName);
    const phone = useInputValidate(checkoutFormData.phone);

    const city = useInputValidate(checkoutFormData.address?.city || "");
    const street = useInputValidate(checkoutFormData.address?.street || "");
    const house = useInputValidate(checkoutFormData.address?.house || "");
    const zipCode = useInputValidate(checkoutFormData.address?.zipCode || "");

    const clearInputs = useCallback(() => {
        city.clearInput();
        street.clearInput();
        house.clearInput();
        zipCode.clearInput();
    }, []);

    useEffect(() => {
        if (deliveryType === DELIVERY) {
            fullName.error ||
            phone.error ||
            city.error ||
            street.error ||
            house.error ||
            zipCode.error
                ? setFieldValidation(true)
                : setFieldValidation(false);
        } else {
            fullName.error || phone.error
                ? setFieldValidation(true)
                : setFieldValidation(false);
        }
    }, [
        deliveryType,
        fullName.error,
        phone.error,
        city.error,
        street.error,
        house.error,
        zipCode.error,
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {
            fullName: fullName.value,
            phone: phone.value,
            additionally,
            deliveryType,
        };

        if (deliveryType === DELIVERY) {
            const address = {
                city: city.value,
                street: street.value,
                house: house.value,
                zipCode: zipCode.value,
            };

            order.address = address;
        }

        dispatch(setOrderDetails(order));
        navigate("/payment");
    };

    return (
        <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                <TextField
                    sx={{ width: "calc(50% - 8px)" }}
                    label="Имя и фамилия"
                    variant="outlined"
                    value={fullName.value}
                    onChange={fullName.onChange}
                    onBlur={fullName.onBlur}
                    error={fullName.error && fullName.blur}
                    helperText={
                        fullName.error && fullName.blur && "Заполните поле"
                    }
                />
                <TextField
                    sx={{ width: "calc(50% - 8px)" }}
                    type="tel"
                    label="Номер телефона"
                    variant="outlined"
                    value={phone.value}
                    onChange={phone.onChange}
                    onBlur={phone.onBlur}
                    error={phone.error && phone.blur}
                    helperText={phone.error && phone.blur && "Заполните поле"}
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Дополнительно к заказу"
                    multiline
                    rows={3}
                    fullWidth
                    value={additionally}
                    onChange={(e) => setAdditionally(e.target.value)}
                />
            </Box>

            <FormControl sx={{ mt: 4, mb: 4 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                    Оформление доставки
                </FormLabel>
                <RadioGroup value={deliveryType} name="radio-buttons-group">
                    <FormControlLabel
                        sx={{ color: "text.primary" }}
                        value={DELIVERY}
                        control={
                            <Radio
                                onChange={(e) => {
                                    setDeliveryType(e.target.value);
                                    clearInputs();
                                }}
                            />
                        }
                        label="Доставка"
                    />
                    {deliveryType === DELIVERY && (
                        <Box
                            sx={{
                                color: "text.primary",
                                mt: 2,
                                mb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            <Typography sx={{ mb: 2, width: "100%" }}>
                                Укажите адрес доставки:
                            </Typography>
                            <TextField
                                sx={{
                                    width: "calc(50% - 8px)",
                                    mb: 2,
                                }}
                                label="Город"
                                variant="outlined"
                                value={city.value}
                                onChange={city.onChange}
                                onBlur={city.onBlur}
                                error={city.error && city.blur}
                                helperText={
                                    city.error && city.blur && "Заполните поле"
                                }
                            />
                            <TextField
                                sx={{
                                    width: "calc(50% - 8px)",
                                    mb: 2,
                                }}
                                label="Улица"
                                variant="outlined"
                                value={street.value}
                                onChange={street.onChange}
                                onBlur={street.onBlur}
                                error={street.error && street.blur}
                                helperText={
                                    street.error &&
                                    street.blur &&
                                    "Заполните поле"
                                }
                            />
                            <TextField
                                sx={{
                                    width: "calc(50% - 8px)",
                                    mb: 2,
                                }}
                                label="Дом"
                                variant="outlined"
                                value={house.value}
                                onChange={house.onChange}
                                onBlur={house.onBlur}
                                error={house.error && house.blur}
                                helperText={
                                    house.error &&
                                    house.blur &&
                                    "Заполните поле"
                                }
                            />
                            <TextField
                                sx={{
                                    width: "calc(50% - 8px)",
                                    mb: 2,
                                }}
                                label="Почтовый индекс"
                                variant="outlined"
                                value={zipCode.value}
                                onChange={zipCode.onChange}
                                onBlur={zipCode.onBlur}
                                error={zipCode.error && zipCode.blur}
                                helperText={
                                    zipCode.error &&
                                    zipCode.blur &&
                                    "Заполните поле"
                                }
                            />
                        </Box>
                    )}

                    <FormControlLabel
                        sx={{ color: "text.primary" }}
                        value={TAKE_WITH_ME}
                        control={
                            <Radio
                                onChange={(e) => {
                                    setDeliveryType(e.target.value);
                                }}
                            />
                        }
                        label="Забрать из магазина"
                    />
                </RadioGroup>
            </FormControl>

            <Box sx={{ display: "flex" }}>
                <Button
                    size="large"
                    fullWidth
                    sx={{ mr: 2 }}
                    variant="outlined"
                    component={RouterLink}
                    to="/cart"
                >
                    Назад в корзину
                </Button>
                <Button
                    disabled={fieldValidation}
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                >
                    Перейти к оплате
                </Button>
            </Box>
        </Box>
    );
});

export default CheckoutForm;
