import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../store/orderApi';

import Head from '../components/UserDashboard/Head';
import Loader from '../components/Loader/Loader';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import OrderProductsList from '../components/UserDashboard/OrderProductsList';
import { Grid, Paper, Typography } from '@mui/material';

const OrderDetails = () => {
    const { id } = useParams();
    const { data, isFetching, error } = useGetOrderQuery(id);
    return (
        <>
            <Head
                Icon={ShoppingBagOutlinedIcon}
                title="Информация о заказе"
                button="Назад к заказам"
                link="/profile/orders"
            />
            {isFetching && <Loader />}
            {error && (
                <Typography
                    variant="h4"
                    textAlign="center"
                    sx={{ color: 'text.primary' }}
                >
                    Ошибка при загрузке данных
                </Typography>
            )}
            {data && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <OrderProductsList products={data?.products} />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper sx={{ p: 2, boxShadow: 5 }}>
                            <Typography
                                variant="h5"
                                sx={{ mb: 2, color: 'text.primary' }}
                            >
                                Тип доставки
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: 'primary.main' }}
                            >
                                {data.orderInfo.deliveryType === 'delivery'
                                    ? `Адрес доставки: ${data.orderInfo.city}, ${data.orderInfo.street}, ${data.orderInfo.house}, ${data.orderInfo.zipCode}`
                                    : 'Забрать из магазина'}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper sx={{ p: 2, boxShadow: 5 }}>
                            <Typography
                                variant="h5"
                                sx={{ mb: 2, color: 'text.primary' }}
                            >
                                Общая сумма
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: 'primary.main' }}
                            >
                                ${data.totalPrice}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ mb: 2, mt: 2, color: 'text.primary' }}
                            >
                                Тип оплаты
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: 'primary.main' }}
                            >
                                {data.payment.paymentType === 'cash'
                                    ? 'Наличными'
                                    : 'Банковской картой'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default OrderDetails;
