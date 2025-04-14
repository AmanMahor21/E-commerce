'use client';
import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation, useSendOtpMutation } from '@/services/authApi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAccessToken, setMail } from '@/reduxStore/internalSlice';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';

export default function Page() {
  const [email, setEmail] = useState('');
  const [sendAuthCode] = useGoogleLoginMutation();
  const [sendRandomOtp, { data, error, isLoading, isSuccess, reset }] = useSendOtpMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const loginResponse = await sendAuthCode(tokenResponse.code);
        if (loginResponse) {
          dispatch(setAccessToken(loginResponse.data?.data?.accessToken));
          router.push('/');
        }
      } catch (error) {
        console.error('Error sending auth code:', error);
      }
    },
    onError: () => {
      console.error('Google login failed');
    },
    flow: 'auth-code',
  });

  const sendotp = async () => {
    const otpRes = await sendRandomOtp(email);
    if (otpRes?.data?.data) {
      dispatch(setMail(email));
      router.push('/otp');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 px-3">
      <div className="flex items-center pb-10 h-full  gap-0 cursor-pointer text-orange-500 font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-wide">
        <span className="text-gray-400 text-[54px] font-cherry">Trend</span>
        <span className="text-orange-500 text-[54px]">ify</span>
      </div>
      <div
        className="flex flex-wrap items-center justify-center bg-slate-700/50 shadow-lg rounded-lg p-10 w-full max-w-4xl
        focus-within:ring-1 focus-within:ring-orange-500"
      >
        <div className="hidden md:block w-1/2 pr-8">
          <Image src="/loginSide.svg" alt="Login Image" width={450} height={450} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <h1 className="text-3xl font-semibold text-white">Login/Signup</h1>
          <p className="text-gray-300 mt-2 text-base">Continue to access your Trendify account</p>

          <form action="" className="w-full flex flex-col mt-8">
            <input
              type="email"
              placeholder="Enter your Email Id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
            <button
              type="button"
              disabled={isLoading}
              className={`mt-4 w-full py-2 text-white rounded-lg text-lg font-semibold transition duration-200 ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
              onClick={sendotp}
            >
              <div className="flex items-center justify-center gap-2">
                Send OTP
                {isLoading && <Spinner animation="border" variant="info" size="sm" />}
              </div>
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 my-6 w-full">
            <div className="flex-1 h-px bg-gray-500"></div>
            <p className="text-gray-400 text-sm">or Login with</p>
            <div className="flex-1 h-px bg-gray-500"></div>
          </div>

          <button
            className="w-full py-2 bg-blue-600 text-white flex items-center justify-center gap-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
            onClick={() => googleLogin()}
          >
            <Image src="/GoogleIcon.svg" alt="Google Icon" width={16} height={16} />
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
}
