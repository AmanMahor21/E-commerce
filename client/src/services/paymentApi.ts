import { api } from './api';

interface PaymentRequest {
  upiID?: string;
  amount: number;
}
interface OTPRequest {
  paymentId: string;
  action: string;
  otp?: string;
}
interface orderPayRequest {
  sessionId: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  upiId?: string;
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
}
interface PaymentResponse {
  success: boolean;
  message?: string;
  data: Record<string, any>; // Accepts any object shape
  // data?: {
  //   payment_session_id: string;
  // };
}
interface upiResponse {
  success: boolean;
  message?: string;
  data: Record<string, any>;
}
interface otpResponse {
  success: boolean;
  message?: string;
  data: string;
}
export const paymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    initiatePayment: build.mutation<PaymentResponse, PaymentRequest>({
      query: ({ amount }) => ({
        url: '/payment/payment-initiate',
        method: 'POST',
        headers: {
          Authorization: `Bearer U2FsdGVkX19tgKGFbHiGzSet/bM1Q1wXpJtMcyzoXnnfmhZQPXdIj0Pf/erOIgKJW8oJQUeVSsO0CuSFROq2r/5Zc3mwL9Cls/Zp73J+DB4DCuUbB6vUUOpKx4wpKvFIqqjUrgkNshFR8MaWhK2ez8/+xZ8jZqjDAqOp6+awp7181+eMAn4sB9V4yl+RRHYtjopkMEVUMCWDNwB89YtwuA==`,
        },
        body: { amount },
      }),
    }),
    upiPayment: build.mutation<upiResponse, orderPayRequest>({
      query: ({ sessionId, paymentMethod, upiId, cardNumber, expiryMonth, expiryYear, cvv }) => ({
        url: '/payment/order-pay',
        method: 'POST',
        headers: {
          Authorization: `Bearer U2FsdGVkX19tgKGFbHiGzSet/bM1Q1wXpJtMcyzoXnnfmhZQPXdIj0Pf/erOIgKJW8oJQUeVSsO0CuSFROq2r/5Zc3mwL9Cls/Zp73J+DB4DCuUbB6vUUOpKx4wpKvFIqqjUrgkNshFR8MaWhK2ez8/+xZ8jZqjDAqOp6+awp7181+eMAn4sB9V4yl+RRHYtjopkMEVUMCWDNwB89YtwuA==`,
        },
        body: {
          sessionId,
          paymentMethod,
          ...(paymentMethod === 'upi' && { upiId }),
          ...(paymentMethod === 'card' && { cardNumber, expiryMonth, expiryYear, cvv }),
        },
      }),
    }),
    sendOTP: build.mutation<otpResponse, OTPRequest>({
      query: ({ paymentId, action, otp }) => ({
        url: '/payment/send-otp',
        method: 'POST',
        headers: {
          Authorization: `Bearer U2FsdGVkX19tgKGFbHiGzSet/bM1Q1wXpJtMcyzoXnnfmhZQPXdIj0Pf/erOIgKJW8oJQUeVSsO0CuSFROq2r/5Zc3mwL9Cls/Zp73J+DB4DCuUbB6vUUOpKx4wpKvFIqqjUrgkNshFR8MaWhK2ez8/+xZ8jZqjDAqOp6+awp7181+eMAn4sB9V4yl+RRHYtjopkMEVUMCWDNwB89YtwuA==`,
        },
        body: { paymentId, action, otp },
      }),
    }),
    resendOTP: build.mutation<otpResponse, OTPRequest>({
      query: ({ paymentId, action, otp }) => ({
        url: '/payment/send-otp',
        method: 'POST',
        headers: {
          Authorization: `Bearer U2FsdGVkX19tgKGFbHiGzSet/bM1Q1wXpJtMcyzoXnnfmhZQPXdIj0Pf/erOIgKJW8oJQUeVSsO0CuSFROq2r/5Zc3mwL9Cls/Zp73J+DB4DCuUbB6vUUOpKx4wpKvFIqqjUrgkNshFR8MaWhK2ez8/+xZ8jZqjDAqOp6+awp7181+eMAn4sB9V4yl+RRHYtjopkMEVUMCWDNwB89YtwuA==`,
        },
        body: { paymentId, action, otp },
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation, useUpiPaymentMutation, useSendOTPMutation } = paymentApi;
