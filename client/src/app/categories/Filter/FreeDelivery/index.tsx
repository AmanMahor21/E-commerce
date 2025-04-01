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
    <div className="flex pb-5 pl-5">
      <div
        onClick={toggleActive}
        className={`relative py-4 h-[44px] border-[2px] p-3 flex items-center rounded-[8px] text-[26px] font-medium tracking-[0.02em] decoration-skip-ink-none decoration-from-font cursor-pointer ${
          isActive ? 'bg-[#FF7F32] text-white border-[#FF7F32]' : 'border-black'
        } w-auto min-w-[120px] max-w-[300px]`}
      >
        <span className="mr-4 ml-1">Free Delivery</span>
      </div>
    </div>
  );
};

export default DeliveryFilter;
