import React, { useState, useEffect } from 'react';

import { Grid, Box } from '@mui/material';

const ProductImage = ({ images, alt }) => {
    const [activeImage, setActiveImage] = useState(images[0]);

    useEffect(() => {
        setActiveImage(images[0]);
    }, [images]);

    const handlerClick = (image) => {
        setActiveImage(image);
    };

    return (
        <Grid
            item
            xs={6}
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <img
                className="product-photo product-photo_large"
                src={activeImage}
                alt={alt}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                }}
            >
                {images.map((image) => {
                    return (
                        <img
                            className={`product-photo product-photo_small 
                            ${image === activeImage ? 'active' : ''}`}
                            onClick={() => handlerClick(image)}
                            key={image}
                            src={image}
                            alt={alt}
                            style={{ cursor: 'pointer', margin: '0 5px' }}
                        />
                    );
                })}
            </Box>
        </Grid>
    );
};

export default ProductImage;
