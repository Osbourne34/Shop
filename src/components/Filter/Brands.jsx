import React from 'react';
import { useDispatch } from 'react-redux';
import { addBrand, removeBrand, clearBrands } from '../../store/filterSlice';
import { useGetBrandsFromCategoryQuery } from './../../store/productsApi';

import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
} from '@mui/material';

import Loader from '../Loader/Loader';
import { useEffect } from 'react';

const Brands = ({ category }) => {
    const dispatch = useDispatch();
    const {
        data: brands,
        isLoading,
        error,
    } = useGetBrandsFromCategoryQuery(category);

    const chooseBrand = (e) => {
        if (e.target.checked) {
            dispatch(addBrand(e.target.value));
        } else {
            dispatch(removeBrand(e.target.value));
        }
    };

    useEffect(() => {
        dispatch(clearBrands());
    }, [category, dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Typography
                sx={{ py: 4 }}
                textAlign="center"
                color="text.primary"
                variant="h5"
            >
                Не удалось загрузить бренды
            </Typography>
        );
    }

    return (
        <FormGroup>
            {brands.map(({ brand, id }) => {
                return (
                    <FormControlLabel
                        key={id}
                        control={
                            <Checkbox onChange={chooseBrand} value={brand} />
                        }
                        label={brand}
                        sx={{ color: 'text.primary' }}
                    />
                );
            })}
        </FormGroup>
    );
};

export default Brands;
