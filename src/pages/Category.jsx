import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from './../store/productsApi';

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
} from '@mui/material';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import GoodItem from '../components/GoodItem';

const Category = () => {
    const [brandsValues, setBrandValues] = useState([]);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [price, setPrice] = useState('');

    const { category } = useParams();
    const { data, isSuccess } = useGetProductsByCategoryQuery(category);

    useEffect(() => {
        if (isSuccess) {
            setFiltered(data);
        }
    }, [category, isSuccess, data]);

    useEffect(() => {
        if (isSuccess) {
            clearFilter();
        }
    }, [category]);

    const brands = Array.from(
        new Set(data && data.map((item) => JSON.stringify(item.brand))),
    ).map(JSON.parse);

    const handleFilterProducts = () => {
        const brandsFiltered = [];

        brandsValues.forEach((brand) => {
            data.forEach((product) => {
                if (product.brand === brand) {
                    brandsFiltered.push(product);
                }
            });
        });

        if (brandsValues.length > 0) {
            setFiltered([...brandsFiltered]);
        } else {
            setFiltered([...data]);
        }

        if (from > 0 || to > 0) {
            if (brandsFiltered.length > 0) {
                setFiltered([
                    ...brandsFiltered.filter(
                        (product) =>
                            product.price >= from &&
                            product.price <= (to || product.price),
                    ),
                ]);
            } else {
                setFiltered([
                    ...data.filter(
                        (product) =>
                            product.price >= from &&
                            product.price <= (to || product.price),
                    ),
                ]);
            }
        }

        if (price === 'cheaper') {
            setFiltered((prevState) => {
                return [...prevState.slice().sort((a, b) => a.price - b.price)];
            });
        } else if (price === 'expensive') {
            setFiltered((prevState) => {
                return [...prevState.slice().sort((a, b) => b.price - a.price)];
            });
        }
    };

    const handleCheaper = () => {
        setFiltered((prevState) => {
            return [...prevState.slice().sort((a, b) => a.price - b.price)];
        });
    };

    const handleExpensive = () => {
        setFiltered((prevState) => {
            return [...prevState.slice().sort((a, b) => b.price - a.price)];
        });
    };

    const handlePrice = (event, newPrice) => {
        setPrice(newPrice);
    };

    const clearFilter = () => {
        setTo(0);
        setFrom(0);
        setBrandValues([]);
        setFiltered([...data]);
        setPrice('');
    };

    const handleSetBrandValues = (e) => {
        if (e.target.checked) {
            setBrandValues([...brandsValues, e.target.value]);
        } else {
            setBrandValues((prevState) => {
                return prevState.filter((item) => item !== e.target.value);
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
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        type='number'
                        label='От'
                        variant='outlined'
                    />
                    <TextField
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        type='number'
                        label='До'
                        variant='outlined'
                    />
                </Box>
                <Typography sx={{ mb: 2, mt: 2 }} variant='h5'>
                    Бренд
                </Typography>
                <FormGroup>
                    {brands.map((brand) => {
                        return (
                            <FormControlLabel
                                key={brand}
                                control={
                                    <Checkbox
                                        value={brand}
                                        onChange={handleSetBrandValues}
                                    />
                                }
                                label={brand}
                            />
                        );
                    })}
                </FormGroup>
                <Button
                    onClick={handleFilterProducts}
                    sx={{ mt: 2 }}
                    fullWidth
                    variant='contained'>
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

                    <ToggleButtonGroup
                        value={price}
                        exclusive
                        onChange={handlePrice}>
                        <ToggleButton
                            onClick={handleCheaper}
                            color='secondary'
                            sx={{ pr: 2 }}
                            size='small'
                            value='cheaper'>
                            <ArrowDownwardRoundedIcon sx={{ mr: 1 }} />
                            Дешевле
                        </ToggleButton>
                        <ToggleButton
                            onClick={handleExpensive}
                            color='secondary'
                            sx={{ pr: 2 }}
                            size='small'
                            value='expensive'>
                            <ArrowUpwardRoundedIcon sx={{ mr: 1 }} />
                            Дороже
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Grid sx={{ mb: 5 }} container spacing={2}>
                    {filtered.length > 0 ? (
                        filtered.map((product) => {
                            return (
                                <Grid key={product?.id} item xs={4}>
                                    <GoodItem {...product} />
                                </Grid>
                            );
                        })
                    ) : (
                        <Typography sx={{ pl: 2 }} variant='h4'>
                            Ничего не найдено
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Category;
