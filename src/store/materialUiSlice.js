import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShowDialog: false,
    notification: {
        isShowNotification: false,
        vertical: 'bottom',
        horizontal: 'right',
        message: null,
    },
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
        showNotification(state, action) {
            state.notification.isShowNotification = true;
            state.notification.message = action.payload;
        },
        hideNotification(state, action) {
            state.notification.isShowNotification = false;
        },
        toggleDrawer(state, action) {
            state.isShowDrawer = action.payload;
        }
    },
});

export const {
    showDialog,
    hideDialog,
    showNotification,
    hideNotification,
    toggleDrawer,
} = materialUi.actions;

export default materialUi.reducer;
