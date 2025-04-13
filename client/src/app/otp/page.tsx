'use client';

import { setUser } from '@/reduxStore/internalSlice';
import { useSendOtpMutation, useVerifyOtpMutation } from '@/services/authApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Page() {
  const [code, setOtp] = useState<string>('');
  const email = useSelector((state: any) => state.internal.mail);
  const [sendRandomOtp] = useSendOtpMutation();
  const [matchotp] = useVerifyOtpMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  // Resend OTP
  const resendOtp = async () => {
    await sendRandomOtp(email);
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!email || !code) return;
    const verifyRes = await matchotp({ mail: email, otp: code }).unwrap();
    console.log(verifyRes, 'bbbbb');
    console.log('Document cookies:', document.cookie);
    const customer = {
      fName: (verifyRes.data as any).firstName,
      lName: (verifyRes.data as any).lastName,
      mobile: (verifyRes.data as any).mobileNumber,
      gender: (verifyRes.data as any).gender,
    };
    // console.log(customer, 'customercustomercustomer');
    verifyRes.status == 1 ? dispatch(setUser(customer)) : '';

    verifyRes.alreadyCustomer == '' ? router.push('/') : router.push('/profile');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 px-3">
      {/* Logo */}
      <div className="mb-6">
        <Image src="/Logo.svg" alt="TastEzy logo" width={150} height={150} />
      </div>

      {/* OTP Container */}
      <div className="flex flex-col lg:flex-row items-center bg-slate-700/50 shadow-lg rounded-lg p-10 w-full max-w-4xl focus-within:ring-1 focus-within:ring-orange-500">
        {/* OTP Image (Hidden on Small Screens) */}
        <div className="hidden lg:block w-1/2">
          <Image src="/Otp.svg" alt="OTP Image" width={350} height={350} />
        </div>

        {/* OTP Input Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center cursor-pointer">
          {/* Back to Login */}
          <div
            className="flex items-center gap-2 mb-4 self-start"
            onClick={() => router.push('/login')}
          >
            <Image src="/Back_Arrow.svg" alt="Back" width={20} height={20} />
            <h1 className="text-white text-lg font-medium ">Back to login/signup</h1>
          </div>

          {/* Title & Description */}
          <h1 className="text-3xl font-semibold text-white mt-4">Verify Code</h1>
          <p className="text-gray-300 mt-2 text-sm">
            An authentication code has been sent to your email.
          </p>

          {/* OTP Input */}
          <form action="" className="w-full flex flex-col mt-6">
            <input
              placeholder="Enter Code"
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              className="px-4 py-2 w-full max-w-md text-white bg-gray-700 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />

            {/* Resend OTP */}
            <div className="mt-4 text-sm font-medium text-gray-400">
              Didn't receive a code?{' '}
              <span className="text-orange-400 cursor-pointer hover:underline" onClick={resendOtp}>
                Resend
              </span>
            </div>

            {/* Verify Button */}
            <button
              type="button"
              onClick={verifyOtp}
              className="mt-6 w-full max-w-md py-2 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-200"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
