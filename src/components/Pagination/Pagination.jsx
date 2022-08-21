import React from 'react';

import { Stack, Pagination as PaginationMui } from '@mui/material';

const Pagination = ({ page, handleChange, count }) => {
    return (
        <Stack spacing={2}>
            <PaginationMui
                page={page}
                onChange={handleChange}
                count={count}
                variant="outlined"
            />
        </Stack>
    );
};

export default Pagination;
