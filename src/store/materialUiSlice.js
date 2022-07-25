import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShowDialog: false,
    isShowDrawer: false,
};

const materialUi = createSlice({
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

export const { showDialog, hideDialog, toggleDrawer } = materialUi.actions;

export default materialUi.reducer;
