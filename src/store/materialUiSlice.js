import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShowDialog: false,
    isShowDrawer: false,
};

const materialUiSlice = createSlice({
    name: 'materialUi',
    initialState,
    reducers: {
        showDialog(state, action) {
            state.isShowDialog = true;
        },
        hideDialog(state, action) {
            state.isShowDialog = false;
        },
        toggleDrawer(state, action) {
            state.isShowDrawer = action.payload;
        },
    },
});

export const materialUi = (state) => state.materialUi;

export const { showDialog, hideDialog, toggleDrawer } = materialUiSlice.actions;

export default materialUiSlice.reducer;
