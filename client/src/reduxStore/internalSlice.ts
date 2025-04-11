import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCategoryActive: false,
  products: [],
  FavProducts: [],
  expectedAddress: '',
  cartItemId: [],
  accessToken: '',
  mail: '',
  customerInfo: {},
};

const InternalSlice = createSlice({
  name: 'internal',
  initialState,
  reducers: {
    resetProductInput: (state, action) => {
      state.isCategoryActive = action.payload;
    },
    setFethedProducts: (state, action) => {
      state.products = action.payload;
    },
    setFavProducts: (state, action) => {
      state.FavProducts = action.payload;
    },
    setExpectedAddress: (state, action) => {
      state.expectedAddress = action.payload;
    },
    setCartItemId: (state, action) => {
      state.cartItemId = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setMail: (state, action) => {
      state.mail = action.payload;
    },
    setUser: (state, action) => {
      // console.log(action, 'customerInfo customerInfo customerInfo');
      state.customerInfo = action.payload;
    },

    // resetPayment: () => initialState,
  },
});

export const {
  resetProductInput,
  setFethedProducts,
  setFavProducts,
  setExpectedAddress,
  setCartItemId,
  setAccessToken,
  setMail,
  setUser,
} = InternalSlice.actions;

export default InternalSlice.reducer;
