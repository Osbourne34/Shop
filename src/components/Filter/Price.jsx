import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceFrom, setPriceTo, clearPrices } from '../../store/filterSlice';

import { Box, TextField } from '@mui/material';
import { useEffect } from 'react';

const Price = ({ category }) => {
    const dispatch = useDispatch();
    const { priceFrom: from, priceTo: to } = useSelector(
        (state) => state.filter,
    );

    const handleChangeFrom = (e) => {
        dispatch(setPriceFrom(e.target.value));
    };
    const handleChangeTo = (e) => {
        dispatch(setPriceTo(e.target.value));
    };

    useEffect(() => {
        dispatch(clearPrices());
    }, [category, dispatch]);

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                value={from}
                onChange={handleChangeFrom}
                type="number"
                label="От"
                variant="outlined"
            />
            <TextField
                value={to}
                onChange={handleChangeTo}
                type="number"
                label="До"
                variant="outlined"
            />
        </Box>
    );
};

export default Price;
