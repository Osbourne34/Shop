import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    phone: "",
    additionally: "",
    deliveryType: "delivery",
    address: {
        city: "",
        street: "",
        house: "",
        zipCode: "",
    },
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderDetails(state, action) {
            state.fullName = action.payload.fullName;
            state.phone = action.payload.phone;
            state.additionally = action.payload.additionally;
            state.deliveryType = action.payload.deliveryType;
            state.address = action.payload.address;
        },
    },
});

export const { setOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
