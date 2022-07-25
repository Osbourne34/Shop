import React, { useState, useEffect } from 'react';
import { useLazyGetProductsPageQuery } from './../../store/productsApi';

import ProductsList from './ProductsList';
import Loader from '../Loader/Loader';
import { Typography, Box } from '@mui/material';
import { useCallback } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [fetching, setFetching] = useState(true);

    const [getProductsPage, { isLoading, error }] =
        useLazyGetProductsPageQuery();

    const handleScroll = useCallback(
        (e) => {
            if (
                e.target.documentElement.scrollHeight -
                    (e.target.documentElement.scrollTop + window.innerHeight) <
                    100 &&
                products.length < totalCount
            ) {
                setFetching(true);
            }
        },
        [products.length, totalCount],
    );

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [totalCount, products, handleScroll]);

    useEffect(() => {
        const get = async () => {
            if (fetching) {
                try {
                    const { data } = await getProductsPage(currentPage);
                    setProducts((prevState) => [
                        ...prevState,
                        ...data.apiResponse,
                    ]);
                    setCurrentPage((prevState) => prevState + 1);
                    setTotalCount(data.totalCount);
                } finally {
                    setFetching(false);
                }
            }
        };

        get();
    }, [fetching, getProductsPage, currentPage]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Box sx={{ my: 15 }}>
                <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{ color: 'text.primary' }}
                >
                    Ошибка при загрузке товаров
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <ProductsList products={products} row={3} />
        </>
    );
};

export default Products;
