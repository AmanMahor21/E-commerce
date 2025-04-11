'use client';
import React, { useState } from 'react';
import Upi from '../Upi';
import Card from '../Card'; // Import the Card component
import NetBanking from '../NetBanking';
import Image from 'next/image';
import OTPForm from '../OtpForm'; // Assuming OTPForm is a separate component
import {
  useInitiatePaymentMutation,
  useUpiPaymentMutation,
  useSendOTPMutation,
} from '@/services/paymentApi';

import {
  setPaymentMethod,
  setAmount,
  setCeateOrderResponse,
} from '../../../reduxStore/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
const PaymentCard = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI Id');
  const [paymentMessageVisible, setPaymentMessageVisible] = useState(false);
  const [isUpiDisabled, setIsUpiDisabled] = useState(false); // Controls visibility of Upi, Pay button, and Disclaimer
  const [showOtpForm, setShowOtpForm] = useState(false); // State to control OTP form visibility
  const [cardInfo, setCardInfo] = useState({
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvv: '',
  });
  const [otpInfo, setOtpInfo] = useState({
    action: '',
    otp: '',
    cfPaymentId: '',
  });
  const dispatch = useDispatch();
  const { amount, upi } = useSelector((state: any) => state.payment);

  const [initiatePayment, { isLoading, isError }] = useInitiatePaymentMutation();
  const [sendOTP, { isLoading: otpLoading, isError: otpError }] = useSendOTPMutation();
  const [upiPayment, { isLoading: upiPaymentLoading, isError: upiPaymentError }] =
    useUpiPaymentMutation();

  const handlePayment = async () => {
    if (selectedPaymentMethod === 'UPI Id') {
      const response = await initiatePayment({ amount: 1 });
      if (response?.data?.data?.payment_session_id) {
        const upiResponse = await upiPayment({
          sessionId: response?.data?.data?.payment_session_id,
          paymentMethod: 'upi',
          upiId: upi,
          // upiId: '7694995805@airtel',
        });
      }
      // console.log(response.data.data, 'res');
      setPaymentMessageVisible(true);
      dispatch(setPaymentMethod('upi'));
      dispatch(setCeateOrderResponse(response));
      setIsUpiDisabled(true); // Disable Upi, Pay button, and Disclaimer
    } else if (selectedPaymentMethod === 'Card') {
      const response = await initiatePayment({ amount: 1 });
      if (response?.data?.data?.payment_session_id) {
        const upiResponse = await upiPayment({
          sessionId: response?.data?.data?.payment_session_id,
          paymentMethod: 'card',
          upiId: upi,
          cardNumber: cardInfo?.card_number,
          expiryMonth: cardInfo?.expiry_month,
          expiryYear: cardInfo?.expiry_year,
          cvv: cardInfo?.cvv,
          // upiId: '7694995805@airtel',
        });
        if (upiResponse?.data?.data?.cf_payment_id) {
          setOtpInfo((prev) => ({ ...prev, cfPaymentId: upiResponse?.data?.data?.cf_payment_id }));
          // sendOTP({
          //   paymentId: upiResponse?.data?.data?.cf_payment_id,
          //   action: otpInfo.action,
          //   otp: otpInfo.otp,
          // });
        }
      }
      setShowOtpForm(true); // Show OTP form after card payment
    } else {
      setPaymentMessageVisible(false);
      setIsUpiDisabled(false);
    }
  };

  return (
    <div className="pr-4 pl-[130px] w-1/2">
      <div className="p-12">
        {/* Payment Header */}
        <div className="p-3 text-2xl font-semibold leading-7 tracking-tight text-left">Payment</div>
        <div className="mt-2 border-[1px] w-full bg-gray-500"></div>
        {/* Payment Methods - Always Visible */}
        <div className="py-8">
          <div className="font-semibold text-[20px] mb-4">Pay With:</div>
          <div className="flex gap-10">
            {['UPI Id', 'Card', 'Net Banking'].map((method) => (
              <div className="inline-flex items-center" key={method}>
                <label className="relative flex items-center cursor-pointer">
                  <input
                    name="paymentMethod"
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-[2px] border-gray-400 checked:border-green-500 transition-all"
                    checked={selectedPaymentMethod === method}
                    onChange={() => {
                      setSelectedPaymentMethod(method);
                      setPaymentMessageVisible(false); // Reset on payment method change
                      setIsUpiDisabled(false); // Ensure all components are shown again
                      setShowOtpForm(false); // Hide OTP form when changing payment method
                    }}
                  />
                  <span className="absolute bg-green-500 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label className="ml-2 text-slate-600 cursor-pointer text-[16px]">{method}</label>
              </div>
            ))}
          </div>
        </div>
        {/* Payment Component - Show Payment Details Based on Selected Method */}
        {!showOtpForm && !isUpiDisabled && (
          <>
            {selectedPaymentMethod === 'UPI Id' && <Upi />}
            {selectedPaymentMethod === 'Card' && (
              <Card setCardInfo={setCardInfo} cardInfo={cardInfo} />
            )}
            {selectedPaymentMethod === 'Net Banking' && <NetBanking />}
          </>
        )}
        {/* Display Payment Message for UPI */}
        {paymentMessageVisible && selectedPaymentMethod === 'UPI Id' && (
          <div className="mt-6">
            <div className="text-lg font-semibold text-green-600">
              Payment Request Sent to - 778041xxx6@ybl
            </div>
            <div className="text-gray-600 mt-2">Open the UPI app and make the payment.</div>
            <Image
              src="/Frame 1000006617.svg" // Add your UPI icon/image URL here
              alt="UPI Payment"
              className="mt-4 ml-20"
              width={154}
              height={256}
            />
          </div>
        )}
        {/* OTP Form Display */}
        {showOtpForm && (
          <OTPForm setOtpInfo={setOtpInfo} otpInfo={otpInfo} /> // Show OTP form component when needed
        )}
        {/* Pay Button */}
        {!isUpiDisabled && !showOtpForm && (
          <div className="mt-8">
            <button
              className="w-full h-[56px] bg-green-500 text-white text-lg font-semibold rounded-md"
              type="button"
              onClick={handlePayment}
            >
              Pay ₹289
            </button>
          </div>
        )}
        {/* Disclaimer */}
        {!isUpiDisabled && (
          <div className="text-sm text-gray-600 mt-6">
            Your personal data will be used to process your order, support your experience
            throughout this website, and for other purposes described in our privacy policy.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
