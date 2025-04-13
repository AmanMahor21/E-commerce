import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
// import { logout, setCredentials } from "../auth/authSlice"; // Redux actions
// import { RootState } from "../store"; // Redux store type

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://e-commerce-backend-n6zh.onrender.com/api',
  // baseUrl: 'https://e-commerce-ruddy-pi.vercel.app/api/',
  // baseUrl: 'http://localhost:8000/api/',
  credentials: 'include', // ✅ Important for cookies!
});

// ⬇️ Handles Token Expiry and Refresh

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    console.warn('🔄 Token expired, attempting refresh...');

    // Attempt to refresh the token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      console.log('✅ Token refreshed successfully!');

      // Store the new token
      //   api.dispatch(setCredentials(refreshResult.data));

      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('❌ Refresh failed, logging out...');
      //   api.dispatch(logout()); // Clear user state
    }
  }

  return result;
};
