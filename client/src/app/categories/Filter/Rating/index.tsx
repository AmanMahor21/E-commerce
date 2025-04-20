'use client';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { getReadableNameFromPath } from '@/utils/helpers';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const RatingFilter = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const keyword = getReadableNameFromPath(pathname);
  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  // Toggle the state on the basis of rating btn
  useEffect(() => {
    if (isActive) {
      dispatch(setProductFilter({ keyword: decodeURIComponent(keyword), rating: 4 }));
    } else {
      dispatch(setProductFilter({ rating: 0 }));
    }
  }, [isActive]);

  const resetActive = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click from triggering
    dispatch(setProductFilter({ rating: 0 }));
    setIsActive(false);
  };

  return (
    <div
      className="flex lg:w-fit items-center w-full lg:h-fit justify-center"
      onClick={toggleActive}
    >
      <div
        className={`relative h-fit  lg:w-fit lg:pt-[2px] flex items-center rounded-[8px] text-sm lg:text-sm font-medium tracking-[0.02em] decoration-skip-ink-none decoration-from-font cursor-pointer ${
          isActive ? ' text-orange-400 underline lg:font-bold border-[#FF7F32]' : 'border-black'
          // isActive ? 'bg-[#FF7F32] text-white border-[#FF7F32]' : 'border-black'
        } w-auto min-w-[120px] max-w-[300px]`}
      >
        <span className=" lg:ml-1 w-full flex  justify-center">Rating 4+</span>
      </div>
    </div>
  );
};

export default RatingFilter;
