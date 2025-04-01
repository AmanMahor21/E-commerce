'use client';
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  ClipboardEvent,
  useEffect,
} from 'react';
import { useSendOTPMutation } from '@/services/paymentApi';

interface otpProps {
  otpInfo: { action: string; otp: string; cfPaymentId: string };
  setOtpInfo: React.Dispatch<
    React.SetStateAction<{ action: string; otp: string; cfPaymentId: string }>
  >;
}

const OTPForm: React.FC<otpProps> = ({ setOtpInfo, otpInfo }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]); // RefObject to store references to input elements
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [sendOTP, { isLoading: otpLoading, isError: otpError }] = useSendOTPMutation();

  // Handle input change (for each OTP input field)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });
    console.log(otp, 'otp');

    // Move focus to the next input
    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (index === otp.length - 1) {
      submitButton.current?.focus();
    }
  };

  useEffect(() => {
    setOtpInfo((prev) => ({ ...prev, otp: otp.join(''), action: 'SUBMIT_OTP' }));
  }, [otp]);

  //Handle Resend OTP button
  const handleOtpResend = async () => {
    await sendOTP({
      paymentId: otpInfo?.cfPaymentId,
      action: 'RESEND_OTP',
      // otp: otp.join(''),
    });
  };

  const handleSendOtpBtn = async () => {
    console.log(otpInfo?.cfPaymentId, 'otp otp otp otp');
    await sendOTP({
      paymentId: otpInfo?.cfPaymentId,
      action: 'SUBMIT_OTP',
      otp: otp.join(''),
    });
  };
  // Handle Backspace or Delete
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (otp[index] === '') {
        if (index > 0) {
          inputs.current[index - 1]?.focus();
        }
      }
    }
  };

  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (/^[0-9]{4}$/.test(text)) {
      const digits = text.split('');
      setOtp(digits);
      submitButton.current?.focus();
    }
  };

  // Select the content when focusing the input
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('OTP Verified!');
  };

  return (
    <div className="w-full mx-auto text-center mt-6">
      <header className="mb-8">
        <p className="text-[18px] text-black font-normal">
          Enter your 4-digit OTP to confirm this payment
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-5">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }} // Correctly assign the ref
              type="text"
              className="w-14 h-[60px] text-center text-2xl font-extrabold text-slate-900 border-[2px] border-[#ACACAC] hover:border-slate-200 appearance-none rounded-lg p-4 outline-none focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={handleFocus}
              onPaste={handlePaste}
              pattern="\d*"
              maxLength={1}
            />
          ))}
        </div>

        <div className="w-full mx-auto mt-4 pt-36">
          <button
            type="submit"
            ref={submitButton}
            className="w-3/4 h-[56px] bg-green-500 text-white text-lg font-semibold rounded-md"
            onClick={handleSendOtpBtn}
          >
            Confirm Payment
          </button>
        </div>
      </form>

      <div className="text-sm text-slate-500 mt-4">
        Didn&apos;t receive code?{' '}
        <a
          className="font-medium text-indigo-500 hover:text-indigo-600"
          href="#0"
          onClick={handleOtpResend}
        >
          Resend
        </a>
      </div>
    </div>
  );
};

export default OTPForm;
