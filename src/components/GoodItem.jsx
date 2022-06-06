import React from 'react';

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Rating,
    Box,
    IconButton,
} from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const GoodItem = ({ id, title, description, price, rating, thumbnail }) => {
    return (
        <Card sx={{ boxShadow: 5 }}>
            <CardMedia
                component='img'
                height='200'
                image={thumbnail}
                alt={title}
            />
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}>
                    <Typography variant='h5'>{price} $</Typography>
                    <Rating
                        name='half-rating-read'
                        defaultValue={rating}
                        precision={0.5}
                        readOnly
                    />
                </Box>
                <Typography
                    sx={{ textTransform: 'capitalize' }}
                    noWrap
                    gutterBottom
                    variant='h6'
                    component='div'>
                    {title}
                </Typography>
                <Typography
                    sx={{ height: '60px' }}
                    variant='body2'
                    color='text.secondary'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <IconButton>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default GoodItem;
