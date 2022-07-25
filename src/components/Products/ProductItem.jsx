import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    CardActionArea,
} from '@mui/material';

import AddToCartButton from '../AddToCartButton/AddToCartButton';

const ProductItem = ({ id, title, thumbnail, price, description }) => {
    return (
        <Card sx={{ boxShadow: 5 }}>
            <CardActionArea
                component={RouterLink}
                to={`/product/${id}`}
                sx={{ textDecoration: 'none', color: 'inherit' }}
            >
                <CardMedia
                    component="img"
                    height="250"
                    image={thumbnail}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="h5">${price}</Typography>
                    <Typography
                        sx={{ textTransform: 'capitalize' }}
                        noWrap
                        gutterBottom
                        variant="h6"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{ height: '60px', overflow: 'hidden' }}
                        variant="body2"
                        color="text.secondary"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                <AddToCartButton productId={id} typeButton="icon" />
            </CardActions>
        </Card>
    );
};

export default React.memo(ProductItem);
