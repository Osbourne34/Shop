import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetCategoriesQuery } from './../../store/categoriesApi';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { IconButton, Button } from '@mui/material';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

const SlideNextButton = () => {
    const swiper = useSwiper();

    return (
        <IconButton
            sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                zIndex: 1,
            }}
            onClick={() => swiper.slideNext()}
        >
            <ArrowForwardIosRoundedIcon />
        </IconButton>
    );
};

const SlidePrevButton = () => {
    const swiper = useSwiper();

    return (
        <IconButton
            sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                zIndex: 1,
            }}
            onClick={() => swiper.slidePrev()}
        >
            <ArrowBackIosRoundedIcon />
        </IconButton>
    );
};

const Categories = () => {
    const { data } = useGetCategoriesQuery();

    return (
        <Swiper
            style={{ marginBottom: '40px', padding: '0 40px' }}
            slidesPerView={6}
            spaceBetween={15}
            rewind={true}
            modules={[Navigation]}
            className="mySwiper"
        >
            <SlidePrevButton />
            {data &&
                data.map((category) => {
                    return (
                        <SwiperSlide key={category}>
                            <Button
                                component={RouterLink}
                                to={`/${category}`}
                                size="large"
                                fullWidth
                                variant="contained"
                            >
                                {category}
                            </Button>
                        </SwiperSlide>
                    );
                })}

            <SlideNextButton />
        </Swiper>
    );
};

export default Categories;
