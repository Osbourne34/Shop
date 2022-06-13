import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    anchor: false,
    isShowDialog: false,
    isShowNotification: false,
};

const materialUi = createSlice({
    name: 'materialUi',
    initialState,
    reducers: {
        setAnchor: (state, action) => {
            state.anchor = action.payload;
        },
        showDialog: (state, action) => {
            state.isShowDialog = true;
        },
        hideDialog: (state, action) => {
            state.isShowDialog = false;
        },
        showNotification: (state, action) => {
            state.isShowNotification = true;
        },
        hideNotification: (state, action) => {
            state.isShowNotification = false;
        },
    },
});

export const {
    setAnchor,
    showDialog,
    hideDialog,
    showNotification,
    hideNotification,
} = materialUi.actions;

export default materialUi.reducer;
