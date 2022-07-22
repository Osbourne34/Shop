import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Breadcrumbs as BreadcrumbsMui, Link, Typography } from '@mui/material';

const Breadcrumbs = ({ links }) => {
    console.log(links);

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

            {links.length > 1 &&
                links.map((link, i) => {
                    if (links.length - 1 !== i) {
                        return (
                            <Link
                                component={RouterLink}
                                to="/"
                                color="inherit"
                                underline="hover"
                                key={link}
                            >
                                {link}
                            </Link>
                        );
                    }
                })}

            <Typography color="text.primary">
                {links[links.length - 1]}
            </Typography>
        </BreadcrumbsMui>
    );
};

export default Breadcrumbs;
