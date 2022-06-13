import React, { useEffect, useState } from 'react';
import { useLazyGetProductsQuery } from './../store/productsApi';

import { Grid, CircularProgress, Box, Typography } from '@mui/material';
import GoodItem from './GoodItem';

const GoodsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [fetching, setFetching] = useState(true);

    const [getProducts, { isLoading, isError }] = useLazyGetProductsQuery();

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [totalCount]);

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
                                    <GoodItem {...product} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
        </>
    );
};

export default GoodsList;
