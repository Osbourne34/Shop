import React, { useState, useMemo } from 'react';
import { useDebounce } from '../../hook/useDebounce';
import { useGetAllProductsQuery } from '../../store/productsApi';

import { Box, TextField } from '@mui/material';

import SearchResults from './SearchResults';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const debounce = useDebounce(searchValue);

    const { data } = useGetAllProductsQuery();

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 100);
    };

    useMemo(() => {
        const foundProducts = data?.filter((item) => {
            if (debounce) {
                if (item.title.toLowerCase().includes(debounce.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        setSearchResult(foundProducts);
    }, [debounce, data]);

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
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {searchResult?.length > 0 && isFocused && (
                <SearchResults result={searchResult} />
            )}
        </Box>
    );
};

export default Search;
