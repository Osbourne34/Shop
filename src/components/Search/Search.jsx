import React, { useState, useCallback, useMemo } from 'react';
import { useDebounce } from '../../hook/useDebounce';
import { useGetAllProductsQuery } from '../../store/productsApi';

import { Box, TextField } from '@mui/material';

import SearchResults from './SearchResults';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounce = useDebounce(searchValue);

    const { data } = useGetAllProductsQuery();

    useMemo(() => {
        const res = data?.filter((item) => {
            if (debounce) {
                if (item.title.toLowerCase().includes(debounce.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        setSearchResult(res);
    }, [debounce, data]);

    const handleClick = useCallback(() => {
        setSearchValue('');
    }, []);

    return (
        <Box sx={{ position: 'relative' }}>
            <TextField
                hiddenLabel
                size="small"
                variant="filled"
                placeholder="Поиск"
                sx={{ width: 350 }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {searchResult?.length > 0 && (
                <SearchResults onClick={handleClick} result={searchResult} />
            )}
        </Box>
    );
};

export default Search;
