import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    priceFrom: '',
    priceTo: '',
    brands: [],
    sortType: null,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addBrand(state, action) {
            state.brands = [...state.brands, action.payload];
        },
        removeBrand(state, action) {
            state.brands = state.brands.filter(
                (item) => item !== action.payload,
            );
        },
        clearBrands(state, action) {
            state.brands = [];
        },
        setPriceFrom(state, action) {
            state.priceFrom = action.payload;
        },
        setPriceTo(state, action) {
            state.priceTo = action.payload;
        },
        clearPrices(state, action) {
            state.priceFrom = '';
            state.priceTo = '';
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        clearSortType(state, action) {
            state.sortType = null;
        },
    },
});

export const filter = (state) => state.filter;

export const {
    addBrand,
    removeBrand,
    clearBrands,
    setPriceFrom,
    setPriceTo,
    clearPrices,
    setSortType,
    clearSortType,
} = filterSlice.actions;

export default filterSlice.reducer;
