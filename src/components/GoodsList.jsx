import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLazyGetProductsQuery } from './../store/productsApi';

import {
    Grid,
    CircularProgress,
    Box,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import GoodItem from './GoodItem';

const GoodsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [fetching, setFetching] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const [openAdding, setOpenAdding] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAdding(false);
    };

    const [getProducts, { isLoading, isError }] = useLazyGetProductsQuery();

    useEffect(() => {
        const handleScroll = (e) => {
            if (
                e.target.documentElement.scrollHeight -
                    (e.target.documentElement.scrollTop + window.innerHeight) <
                    100 &&
                products.length < totalCount
            ) {
                setFetching(true);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [products, totalCount]);

    useEffect(() => {
        if (fetching) {
            getProducts(currentPage)
                .then((res) => {
                    setProducts([...products, ...res.data.apiResponse]);
                    setCurrentPage(currentPage + 1);
                    setTotalCount(res.data.totalCount);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    height: '200px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <CircularProgress />;
            </Box>
        );
    } else if (isError) {
        return (
            <Typography sx={{ color: 'text.primary', mt: 3 }} variant='h1'>
                Упс ошибка...
            </Typography>
        );
    }

    return (
        <>
            {products.length && (
                <>
                    <Grid sx={{ mb: 5 }} container spacing={3}>
                        {products.map((product) => {
                            return (
                                <Grid key={product?.id} item xs={3}>
                                    <GoodItem
                                        handleClickOpenDialog={
                                            handleClickOpenDialog
                                        }
                                        setOpenAdding={setOpenAdding}
                                        {...product}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Для добавления товаров в корзину необходимо
                        авторизоваться.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button variant='outlined' onClick={handleCloseDialog}>
                        Позже
                    </Button>
                    <Button
                        sx={{ ml: 2 }}
                        component={RouterLink}
                        to='/login'
                        variant='outlined'
                        onClick={handleCloseDialog}>
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openAdding}
                autoHideDuration={2000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity='success'
                    sx={{ width: '100%' }}>
                    Товар добавлен в корзину
                </Alert>
            </Snackbar>
        </>
    );
};

export default GoodsList;
