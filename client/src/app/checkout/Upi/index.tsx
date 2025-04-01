import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPaymentMethod, setAmount, setUpi } from '@/reduxStore/paymentSlice';

const Upi = () => {
  // Mock data for UPI payment options
  const mockUpiOptions = ['77xxxx7876@ybl', '66xxxx4321@upi'];
  const dispatch = useDispatch();
  const { paymentMethod, amount, upi } = useSelector((state: any) => state.payment);

  return (
    <div className="w-full flex-col items-center">
      {/* Loop through the mockUpiOptions and render the payment options */}
      {mockUpiOptions.map((upi, index) => (
        <div
          key={index}
          className="inline-flex items-center w-full py-3 pl-2 border-[2px] border-gray-300 rounded-lg mb-9"
        >
          <label className="relative flex items-center cursor-pointer">
            <input
              name="framework"
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-[2px] border-gray-400 checked:border-purple-500 transition-all"
              id={`option${index}`}
            />
            <span className="absolute bg-purple-500 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
          </label>
          <label className="pl-4 ml-2 text-black cursor-pointer text-[18px]">Pay with {upi}</label>
        </div>
      ))}

      {/* Static option for entering UPI ID */}
      <div className="inline-flex items-center pl-4 mb-3">
        <label className="relative flex items-center cursor-pointer">
          <input
            name="framework"
            type="radio"
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-[2px] border-gray-400 checked:border-purple-500 transition-all"
            id="option3"
          />
          <span className="absolute bg-purple-500 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
        </label>
        <label className="ml-2 text-black cursor-pointer text-[18px]">Enter UPI Id</label>
      </div>

      <div className="w-full py-4 pl-2 border-[2px] border-gray-300 rounded-lg mb-6">
        <input
          type="text"
          placeholder="Example : 7780xxxx76@ybl"
          className="w-full pl-4 text-black font-medium text-[18px] focus:outline-none placeholder-gray-500"
          onChange={(e) => dispatch(setUpi(e.target.value))}
        />
      </div>

      <div className="inline-flex items-center mb-1">
        <label className="relative flex items-center cursor-pointer">
          <input
            name="framework"
            type="checkbox"
            className="peer rounded-md h-5 w-5 cursor-pointer appearance-none border-[2px] border-gray-400 checked:border-green-500 transition-all"
            id="saveDetails"
          />
          <span className="absolute bg-green-500 rounded-sm w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
        </label>
        <label className="ml-2 text-black cursor-pointer text-[18px]">Save UPI id details</label>
      </div>
    </div>
  );
};

export default Upi;
