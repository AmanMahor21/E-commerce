import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMethod: null,
  amount: 0,
  upi: null,
  createOrderResponse: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setUpi: (state, action) => {
      state.upi = action.payload;
    },
    setCeateOrderResponse: (state, action) => {
      state.createOrderResponse = action.payload;
    },

    resetPayment: () => initialState,
  },
});

export const { setPaymentMethod, setAmount, setUpi, setCeateOrderResponse, resetPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;
