'use client';
import React, { useEffect, useState } from 'react';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLazyGetFilterProductsQuery } from '@/services/api';
const DealsFilter = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.product);
  const [fetchProducts, { data }] = useLazyGetFilterProductsQuery();

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  // Toggle the state on the basis of bestdeal btn
  useEffect(() => {
    if (isActive) {
      dispatch(setProductFilter({ bestDeal: 30 }));
    } else {
      dispatch(setProductFilter({ bestDeal: 0 }));
    }
  }, [isActive]);

  const resetActive = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click from triggering
    dispatch(setProductFilter({ bestDeal: 0 }));
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
        <span className="mr-4 ml-1">Best Deal</span>
      </div>
    </div>
  );
};

export default DealsFilter;
