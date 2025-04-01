'use client';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetFilterProductsQuery } from '@/services/api';
import { useSelector } from 'react-redux';

const PopularityFilter = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.product);
  const [fetchProducts, { data }] = useLazyGetFilterProductsQuery();

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  // Toggle the state on the basis of popularity btn
  useEffect(() => {
    dispatch(setProductFilter({ popularity: isActive }));
  }, [isActive]);

  const resetActive = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setProductFilter({ ...filters, popularity: false }));
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
        <span className="mr-4 ml-1">Popular</span>
      </div>
    </div>
  );
};

export default PopularityFilter;
