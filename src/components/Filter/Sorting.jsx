import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType, clearSortType } from '../../store/filterSlice';

import {
    Box,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

const Sorting = ({ category }) => {
    const dispatch = useDispatch();
    const { sortType } = useSelector((state) => state.filter);

    const onClick = (sortType) => {
        dispatch(setSortType(sortType));
    };

    useEffect(() => {
        dispatch(clearSortType());
    }, [category, dispatch]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 4,
            }}
        >
            <Typography sx={{ mr: 3 }}>Сортировать: </Typography>

            <ToggleButtonGroup value={sortType} exclusive>
                <ToggleButton
                    value="asc"
                    onClick={() => onClick('asc')}
                    color="primary"
                    size="small"
                    sx={{ pr: 2 }}
                >
                    <ArrowDownwardRoundedIcon sx={{ mr: 1 }} />
                    Дешевле
                </ToggleButton>
                <ToggleButton
                    value="desc"
                    onClick={() => onClick('desc')}
                    color="primary"
                    size="small"
                    sx={{ pr: 2 }}
                >
                    <ArrowUpwardRoundedIcon sx={{ mr: 1 }} />
                    Дороже
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default React.memo(Sorting);
