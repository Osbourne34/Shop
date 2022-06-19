import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
    useGetProductsByCategoryQuery,
    useGetProductBrandsQuery,
} from './../store/productsApi';

import {
    Grid,
    TextField,
    Typography,
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Breadcrumbs,
    Link,
    CircularProgress,
} from '@mui/material';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import GoodItem from '../components/GoodItem';

const Category = () => {
    const { category } = useParams();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortType, setSortType] = useState('');

    const [filteredByPrice, setFilteredByPrice] = useState([]);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    const { data: brands, isLoading: isLoadingBrands } =
        useGetProductBrandsQuery(category);

    const { data: products, isLoading: isLoadingCategory } =
        useGetProductsByCategoryQuery(
            `category=${category}${
                selectedBrands.length > 0
                    ? selectedBrands.map((item) => `&brand=${item}`).join('')
                    : ''
            }${sortType ? `&_sort=price&_order=${sortType}` : ''}
        `,
        );

    useEffect(() => {
        if (products) {
            setFilteredByPrice(
                products.filter(
                    (product) =>
                        product.price >= fromValue &&
                        product.price <= (toValue || product.price),
                ),
            );
        }
    }, [fromValue, toValue, products]);

    const handleChangeFromValue = (e) => {
        setFromValue(e.target.value);
    };

    const handleChangeToValue = (e) => {
        setToValue(e.target.value);
    };

    const handleChangeBrands = (e) => {
        if (e.target.checked) {
            setSelectedBrands([...selectedBrands, e.target.value]);
        } else {
            setSelectedBrands((prevState) => {
                return [...prevState.filter((item) => item !== e.target.value)];
            });
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid sx={{ color: 'text.primary' }} item xs={3}>
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                        component={RouterLink}
                        underline='hover'
                        color='inherit'
                        to='/'>
                        Главная
                    </Link>
                    <Typography color='text.primary'>{category}</Typography>
                </Breadcrumbs>

                <Typography sx={{ mb: 2, mt: 2 }} variant='h5'>
                    Цена
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        value={fromValue}
                        onChange={handleChangeFromValue}
                        type='number'
                        label='От'
                        variant='outlined'
                    />
                    <TextField
                        value={toValue}
                        onChange={handleChangeToValue}
                        type='number'
                        label='До'
                        variant='outlined'
                    />
                </Box>
                <Typography sx={{ mb: 2, mt: 2 }} variant='h5'>
                    Бренд
                </Typography>
                <FormGroup>
                    {!isLoadingBrands && !isLoadingCategory ? (
                        brands.map((brand) => {
                            return (
                                <FormControlLabel
                                    key={brand}
                                    control={
                                        <Checkbox
                                            value={brand}
                                            onChange={handleChangeBrands}
                                        />
                                    }
                                    label={brand}
                                />
                            );
                        })
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </FormGroup>
                <Button sx={{ mt: 2 }} fullWidth variant='contained'>
                    Применить фильтр
                </Button>
            </Grid>
            <Grid sx={{ color: 'text.primary' }} item xs={9}>
                <Box
                    sx={{
                        mb: 4,
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Typography sx={{ mr: 3 }}>Сортировать: </Typography>

                    <ToggleButtonGroup value={sortType} exclusive>
                        <ToggleButton
                            color='secondary'
                            sx={{ pr: 2 }}
                            size='small'
                            onClick={() => setSortType('asc')}
                            value='asc'>
                            <ArrowDownwardRoundedIcon sx={{ mr: 1 }} />
                            Дешевле
                        </ToggleButton>
                        <ToggleButton
                            color='secondary'
                            sx={{ pr: 2 }}
                            size='small'
                            onClick={() => setSortType('desc')}
                            value='desc'>
                            <ArrowUpwardRoundedIcon sx={{ mr: 1 }} />
                            Дороже
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Grid sx={{ mb: 5 }} container spacing={2}>
                    {!isLoadingBrands && !isLoadingCategory ? (
                        filteredByPrice.length > 0 ? (
                            filteredByPrice.map((product) => {
                                return (
                                    <Grid xs={4} item key={product.id}>
                                        <GoodItem {...product} />
                                    </Grid>
                                );
                            })
                        ) : (
                            <Typography
                                sx={{ mt: 3, pl: 2, flexGrow: 1 }}
                                textAlign='center'
                                variant='h3'>
                                Ничего не найдено
                            </Typography>
                        )
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                mt: 5,
                            }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Category;
