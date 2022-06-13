import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useGetProductQuery } from './../store/productsApi';

import {
    Typography,
    CircularProgress,
    Grid,
    Box,
    Breadcrumbs,
    Link,
} from '@mui/material';

import AddProductButton from './../components/AddProductButton';

const ProductDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProductQuery(id);
    const [activeImage, setActiveImage] = useState('');

    useEffect(() => {
        setActiveImage(data?.images[0]);
    }, [isLoading, data]);

    const handleToggleImage = (image) => {
        setActiveImage(image);
    };

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
    }

    return (
        <>
            <Breadcrumbs sx={{ mb: 3 }} aria-label='breadcrumb'>
                <Link
                    component={RouterLink}
                    underline='hover'
                    color='inherit'
                    to='/'>
                    Главная
                </Link>
                <Typography color='text.primary'>{data.title}</Typography>
            </Breadcrumbs>

            <Grid container spacing={2}>
                <Grid
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    item
                    xs={6}>
                    <img
                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                        width={'70%'}
                        height={'400px'}
                        src={activeImage}
                        alt={data.title}
                    />
                </Grid>
                <Grid sx={{ color: 'text.primary' }} item xs={6}>
                    <Typography mb={3} variant='h3'>
                        {data.title}
                    </Typography>
                    <Typography mt={2}>
                        Brand:{' '}
                        <span style={{ fontWeight: '500' }}>{data.brand}</span>
                    </Typography>
                    <Typography mt={2}>
                        Сategory:{' '}
                        <span style={{ fontWeight: '500' }}>
                            {data.category}
                        </span>
                    </Typography>
                    <Typography sx={{ maxWidth: '450px' }} mt={2}>
                        {data.description}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            maxWidth: '250px',
                            mt: 2,
                        }}>
                        <Typography variant='h4'>${data.price}</Typography>

                        <AddProductButton
                            id={data.id}
                            title={data.title}
                            price={data.price}
                            thumbnail={data.thumbnail}
                            size={'large'}
                        />
                    </Box>
                </Grid>
                <Grid
                    xs={6}
                    item
                    sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    {data?.images.map((image) => {
                        return (
                            <img
                                className={
                                    image === activeImage
                                        ? 'image active'
                                        : 'image'
                                }
                                onClick={() => handleToggleImage(image)}
                                width='70px'
                                height='70px'
                                key={image}
                                src={image}
                                alt={data.title}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    margin: '0 10px',
                                    cursor: 'pointer',
                                }}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </>
    );
};

export default ProductDetails;
