import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logOut: (state, action) => {
            state.user = null;
        },
    },
});

export const { logOut, setUser } = authSlice.actions;

export default authSlice.reducer;
