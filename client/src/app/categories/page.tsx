'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import DealsFilter from './Filter/Deals';
import DeliveryFilter from './Filter/FreeDelivery';
import PopularityFilter from './Filter/Popularity';
import PriceFilter from './Filter/Price';
import RatingFilter from './Filter/Rating';
// import { Product } from './ProductCard';
import { useSelector } from 'react-redux';
import { useGetCartProductsQuery, useGetFavProductsQuery } from '@/services/api';
import { setFavProducts } from '@/reduxStore/internalSlice';
import { useDispatch } from 'react-redux';

export default function Categories() {
  const [activeName, setActiveName] = useState('Hello!'); // State for active item's name
  const internalState = useSelector((state: any) => state.internal);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetFavProductsQuery();

  useEffect(() => {
    if (data?.data) {
      dispatch(setFavProducts(data?.data));
    }
  }, [data]);

  return (
    <div className="py-[125px] px-[54px] dark: bg-white text-black">
      <div className="flex">
        {/* Pass setActiveName as a prop */}
        <Sidebar setActiveName={setActiveName} />
        <div className="w-full">
          <div className="flex justify-between">
            <div className="text-[24px] font-semibold mb-4 flex items-center justify-center">
              {activeName}
            </div>
            <div className="flex">
              <RatingFilter />
              <PriceFilter />
              {/* <DealsFilter /> */}
              <PopularityFilter />
              <DeliveryFilter />
            </div>
          </div>
          <div className="flex flex-col">
            {internalState?.products?.map((product: any, ind: number) => (
              // {mockProducts.map((product) => (
              <ProductCard key={ind} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
