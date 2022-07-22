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

import AddProductInCart from '../AddProductInCart/AddProductInCart';

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
                    height="200"
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
                <AddProductInCart productId={id} />
            </CardActions>
        </Card>
    );
};

export default React.memo(ProductItem);
