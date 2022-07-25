import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    Box,
} from '@mui/material';

const SearchItem = ({ title, thumbnail, id }) => {
    return (
        <Card sx={{ mb: 1 }}>
            <CardActionArea component={RouterLink} to={`/product/${id}`}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <CardMedia
                        component="img"
                        height="50"
                        image={thumbnail}
                        alt={title}
                        sx={{
                            width: 50,
                            border: '1px solid #fff',
                            borderRadius: 2,
                            flexShrink: 0,
                        }}
                    />
                    <Typography sx={{ ml: 2 }} component="div">
                        {title}
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default SearchItem;
