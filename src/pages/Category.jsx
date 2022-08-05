import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from './../store/productsApi';

import { Grid, Typography } from '@mui/material';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Filter from '../components/Filter/Filter';
import ProductsList from '../components/Products/ProductsList';
import Loader from '../components/Loader/Loader';
import Sorting from '../components/Filter/Sorting';

const Category = () => {
    const { brands, priceFrom, priceTo, sortType } = useSelector(
        (state) => state.filter,
    );
    const [filteredByPrice, setFilteredByPrice] = useState([]);

    const { category } = useParams();

    const { data: products, isLoading: isLoadingProducts } =
        useGetProductsByCategoryQuery(
            `category=${category}${
                brands.length > 0
                    ? brands.map((item) => `&brand=${item}`).join('')
                    : ''
            }${sortType ? `&_sort=price&_order=${sortType}` : ''}`,
        );

    useEffect(() => {
        if (products) {
            setFilteredByPrice(
                products.filter(
                    (product) =>
                        product.price >= priceFrom &&
                        product.price <= (priceTo || product.price),
                ),
            );
        }
    }, [priceFrom, priceTo, products]);

    return (
        <>
            <Breadcrumbs
                links={[
                    {
                        link: null,
                        title: category,
                    },
                ]}
            />
            <Grid container spacing={3}>
                <Filter category={category} />

                <Grid sx={{ color: 'text.primary' }} item xs={9}>
                    <Sorting category={category} />
                    {isLoadingProducts ? (
                        <Loader />
                    ) : filteredByPrice.length > 0 ? (
                        <ProductsList products={filteredByPrice} row={4} />
                    ) : (
                        <Typography textAlign="center" variant="h4">
                            Ничего не найдено
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Category;
