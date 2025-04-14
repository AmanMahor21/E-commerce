import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  limit: 10,
  offset: 0,
  keyword: '',
  popularity: '',
  rating: 0,
  bestDeal: 0,
  // lowestPrice: '',
  // highestPrice: '',
  freeDelivery: '',
  sortBy: '',
  count: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductFilter: (state, action) => {
      console.log(action, 'state actionnn');
      // console.trace(); // 👈 this will show a call stack

      return { ...state, ...action.payload };
    },

    resetPayment: () => initialState,
  },
});

export const { setProductFilter } = productSlice.actions;

export default productSlice.reducer;
