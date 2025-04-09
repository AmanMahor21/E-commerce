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
    <div className="flex lg:w-fit items-center w-full lg:h-fit justify-center">
      <div
        onClick={toggleActive}
        className={`relative h-fit  lg:w-fit flex lg:pt-[2px]  items-center rounded-[8px] text-sm lg:text-sm font-medium tracking-[0.02em] decoration-skip-ink-none decoration-from-font cursor-pointer ${
          isActive ? ' text-orange-400 underline lg:font-bold border-[#FF7F32]' : 'border-black'
        } w-auto min-w-[120px] max-w-[300px]`}
      >
        <span className=" lg:ml-1 w-full flex justify-center">Popularity</span>
      </div>
    </div>
  );
};

export default PopularityFilter;
