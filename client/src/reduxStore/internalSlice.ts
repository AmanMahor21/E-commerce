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
      console.log(action, 'action fetched product');
      state.products = action.payload;
    },
    setFavProducts: (state, action) => {
      console.log(action, 'FavPrdoducts FavPrdoducts FavPrdoducts');
      state.FavProducts = action.payload;
    },
    setExpectedAddress: (state, action) => {
      console.log(action, 'defaultAddress defaultAddress defaultAddress');
      state.expectedAddress = action.payload;
    },
    setCartItemId: (state, action) => {
      console.log(action, 'cartItemId cartItemId cartItemId');
      state.cartItemId = action.payload;
    },
    setAccessToken: (state, action) => {
      console.log(action, 'setAccessToken setAccessToken setAccessToken');
      state.accessToken = action.payload;
    },
    setMail: (state, action) => {
      console.log(action, 'setMail setMail setMail');
      state.mail = action.payload;
    },
    setUser: (state, action) => {
      console.log(action, 'customerInfo customerInfo customerInfo');
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
