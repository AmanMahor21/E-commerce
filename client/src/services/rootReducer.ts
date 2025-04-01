import { combineReducers } from '@reduxjs/toolkit';
import globalreducer from '../reduxStore/globalSlice';
import paymentReducer from '../reduxStore/paymentSlice';
import productReducer from '../reduxStore/productCategorizeSlice';
import internalReducer from '../reduxStore/internalSlice';
import { api } from './api';

const rootReducer = combineReducers({
  global: globalreducer,
  payment: paymentReducer,
  product: productReducer,
  internal: internalReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
