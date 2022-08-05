import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Breadcrumbs as BreadcrumbsMui, Link, Typography } from '@mui/material';

const Breadcrumbs = ({ links }) => {
    return (
        <BreadcrumbsMui sx={{ mb: 3 }}>
            <Link
                component={RouterLink}
                to="/"
                underline="hover"
                color="inherit"
            >
                Главная
            </Link>

            {links.map(({ link, title }) => {
                if (!link) {
                    return (
                        <Typography
                            color="text.primary"
                            key={title}
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {title}
                        </Typography>
                    );
                }
                return (
                    <Link
                        component={RouterLink}
                        to={link}
                        key={link}
                        underline="hover"
                        color="inherit"
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {title}
                    </Link>
                );
            })}
        </BreadcrumbsMui>
    );
};

export default React.memo(Breadcrumbs);
