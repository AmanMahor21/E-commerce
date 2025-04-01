'use client';

import { useGetCartProductsQuery } from '@/services/api';
import Image from 'next/image';
import React from 'react';

// Mock data to simulate API response
const mockOrderData = {
  items: [
    {
      id: 1,
      storeName: 'Avakayala Pickle Store',
      productName: 'Chicken Pickle',
      price: 329,
      quantity: 1,
      image: '/Frame 11.png',
    },
    {
      id: 2,
      storeName: 'Avakayala Store',
      productName: 'Pickle',
      price: 32,
      quantity: 2,
      image: '/Frame 11.png',
    },
  ],
  discountCode: '',
  subtotal: 329,
  total: 329,
  taxesIncluded: true,
};

const OrderSummary = () => {
  const BASE_URL = process.env.BASE_URL;
  const data = mockOrderData;
  const { data: cartItems } = useGetCartProductsQuery();

  return (
    <div className="pl-4 pr-6 w-full md:w-1/2">
      <div className="p-6 md:p-12 bg-white shadow-md rounded-lg">
        {/* Order Summary Heading */}
        <h2 className="p-3 text-2xl font-semibold leading-7 tracking-tight text-left">
          Order Summary
        </h2>
        <div className="border border-gray-300 w-full"></div>

        {/* Cart Items */}
        {cartItems?.data.map((item, indx) => {
          const imageUrl =
            item?.imagePath && item?.image
              ? `${BASE_URL}?path=${item.imagePath}&name=${encodeURIComponent(item.image)}&width=200&height=200`
              : '/Offer2.svg';

          return (
            <div className="pt-6 flex items-start gap-4" key={indx}>
              <img
                src={imageUrl}
                alt="Product"
                className="w-[70px] h-[70px] rounded-md object-cover"
              />

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">{item.companyName}</span>
                  <span className="font-medium text-lg">₹{item.productPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Discount Code Input */}
        <div className="mt-6 border border-gray-300 w-full"></div>
        <div className="flex items-center py-6 gap-3">
          <input
            type="text"
            placeholder="Gift or discount code"
            className="flex-1 h-12 border border-gray-400 rounded-md px-4 text-lg focus:outline-none"
          />
          <button className="w-28 h-12 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition">
            Apply
          </button>
        </div>

        {/* Subtotal */}
        <div className="border border-gray-300 w-full"></div>
        <div className="py-6">
          <div className="flex justify-between font-medium text-lg">
            <span>Subtotal</span>
            <span>₹{data.subtotal}</span>
          </div>
          {data.items.map((item) => (
            <div className="flex justify-between text-gray-700 text-md py-2" key={item.id}>
              <span>{item.productName}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="border border-gray-300 w-full"></div>
        <div className="flex justify-between items-center pt-6">
          <div className="flex flex-col">
            <span className="font-medium text-lg">Total</span>
            <span className="text-gray-500 text-sm">
              {data.taxesIncluded ? 'Including Taxes' : 'Excluding Taxes'}
            </span>
          </div>
          <div className="text-gray-900 font-bold text-3xl">₹{data.total}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
