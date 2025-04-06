import { CreateApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { api } from './api';
import { LoginEmail, profile } from './types';
// import { url } from "inspector";

export interface LoginResponse {
  status: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface generalRes {
  status: number;
  message: string;
  data?: string;
}
export interface verifyOtpResponse {
  status: number;
  message: string;
  alreadyCustomer: string;
  data?: string;
}
export interface TokenRefreshResponse {
  status: number;
  message: string;
}
export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    googleLogin: build.mutation<LoginResponse, string>({
      query: (code) => ({
        url: '/storefront-customer/google/auth',
        method: 'POST',
        body: { code },
      }),
    }),
    sendOtp: build.mutation<generalRes, string>({
      query: (emailId) => ({
        url: '/storefront-customer/send-otp',
        method: 'POST',
        body: { emailId },
      }),
    }),
    verifyOtp: build.mutation<verifyOtpResponse, { mail: string; otp: string }>({
      query: ({ mail, otp }) => ({
        url: '/storefront-customer/verify-otp',
        method: 'POST',
        body: { mail, otp },
      }),
    }),
    completeProfile: build.mutation<generalRes, profile>({
      query: (profile) => ({
        url: '/storefront-customer/complete-profile',
        method: 'PUT',
        body: profile,
      }),
    }),
    logout: build.mutation<generalRes, void>({
      query: () => ({
        url: '/storefront-customer/logout',
        method: 'POST',
        // body: profile,
      }),
    }),
    // refreshToken: build.mutation<tokenRefreshResponse, void>({
    //   query: (code) => ({
    //     url: '/storefront-customer/refresh-token',
    //     method: 'POST',
    //     // body: { code },
    //   }),
    // }),
    refreshToken: build.query<TokenRefreshResponse, void>({
      query: () => '/storefront-customer/refresh-token',
    }),
  }),
});

// export const { useGoogleLoginMutation, useRefreshTokenMutation } = authApi;
export const {
  useGoogleLoginMutation,
  useLazyRefreshTokenQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useCompleteProfileMutation,
  useLogoutMutation,
} = authApi;
