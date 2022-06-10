import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetAllProductsQuery } from './../store/productsApi';

import { Autocomplete, TextField, Typography, Link } from '@mui/material';

const Search = () => {
    const { data, isSuccess } = useGetAllProductsQuery();

    if (isSuccess) {
        return (
            <>
                <Autocomplete
                    size='small'
                    disablePortal
                    id='combo-box-demo'
                    sx={{ width: 400 }}
                    options={data}
                    getOptionLabel={(options) => options.title}
                    renderOption={(props, option) => (
                        <Link
                            component={RouterLink}
                            to={`/product/${option.id}`}
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            {...props}>
                            <img
                                loading='lazy'
                                width='50'
                                height='50'
                                src={option.thumbnail}
                                alt={option.title}
                            />
                            <Typography variant='body2'>
                                {option.title}
                            </Typography>
                        </Link>
                    )}
                    renderInput={(params) => (
                        <TextField
                            color='common'
                            {...params}
                            label='Поиск'
                            inputProps={{
                                ...params.inputProps,
                            }}></TextField>
                    )}
                />
            </>
        );
    }
};

export default Search;
