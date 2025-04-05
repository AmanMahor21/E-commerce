'use client';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useLazyGetFilterProductsQuery } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const DeliveryFilter = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.product);
  const [fetchProducts, { data }] = useLazyGetFilterProductsQuery();

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  // Toggle the state on the basis of free Delivery btn
  useEffect(() => {
    dispatch(setProductFilter({ freeDelivery: isActive }));
  }, [isActive]);

  const resetActive = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click from triggering
    dispatch(setProductFilter({ freeDelivery: false }));
    setIsActive(false);
  };

  return (
    <div className="flex lg:w-fit items-center w-full lg:h-fit justify-center">
      <div
        onClick={toggleActive}
        className={`relative h-fit  lg:w-fit flex items-center lg:pt-[2px] rounded-[8px] text-sm lg:text-sm font-medium tracking-[0.02em] decoration-skip-ink-none decoration-from-font cursor-pointer ${
          isActive ? ' text-orange-400 underline lg:font-bold border-[#FF7F32]' : 'border-black'
        } w-auto min-w-[120px] max-w-[300px]`}
      >
        <span className=" lg:ml-1 w-full flex justify-center">Free Delivery</span>
      </div>
    </div>
  );
};

export default DeliveryFilter;
