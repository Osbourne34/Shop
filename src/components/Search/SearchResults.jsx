import React from 'react';

import { Paper } from '@mui/material';

import SearchItem from './SearchItem';

const SearchResults = ({ result, onClick }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                position: 'absolute',
                top: 'calc(100% + 5px)',
                left: 0,
                width: '100%',
                height: '250px',
                overflow: 'auto',
                py: 1,
                px: 1.5,
            }}
        >
            {result.map((item) => {
                return <SearchItem key={item.id} {...item} onClick={onClick} />;
            })}
        </Paper>
    );
};

export default React.memo(SearchResults);
