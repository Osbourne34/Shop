import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Box,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';

import AddProductButton from './AddProductButton';

const GoodItem = ({ id, title, description, price, thumbnail }) => {
    return (
        <>
            <Card sx={{ boxShadow: 5 }}>
                <Box
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                    component={RouterLink}
                    to={`/product/${id}`}>
                    <CardMedia
                        component='img'
                        height='200'
                        image={thumbnail}
                        alt={title}
                    />
                    <CardContent>
                        <Typography variant='h5'>${price}</Typography>
                        <Typography
                            sx={{ textTransform: 'capitalize' }}
                            noWrap
                            gutterBottom
                            variant='h6'
                            component='div'>
                            {title}
                        </Typography>
                        <Typography
                            sx={{ height: '60px', overflow: 'hidden' }}
                            variant='body2'
                            color='text.secondary'>
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <AddProductButton
                        id={id}
                        title={title}
                        price={price}
                        thumbnail={thumbnail}
                    />
                </CardActions>
            </Card>
        </>
    );
};

export default GoodItem;
