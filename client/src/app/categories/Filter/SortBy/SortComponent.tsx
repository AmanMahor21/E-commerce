'use client';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useLazyGetFilterProductsQuery } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

type SortProps = {
  filterKey: string;
  label: string;
  isActive: boolean;
  onclick: () => void;
};

const SortCondition: React.FC<SortProps> = ({ filterKey, label, isActive, onclick }) => {
  // const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.product);
  const [fetchProducts, { data }] = useLazyGetFilterProductsQuery();

  console.log(filterKey, 'nnnnnnn');
  // const toggleActive = () => {
  //   setIsActive((prev) => !prev);
  // };

  // Toggle the state on the basis of lowest Price btn
  // useEffect(() => {
  //   console.log(label, 'vvvvvvvv');
  //   // dispatch(setProductFilter({ [filterKey]: isActive }));
  //   dispatch(setProductFilter({ sortBy: filterKey }));
  // }, [isActive]);

  // const resetActive = (e: React.MouseEvent) => {
  //   e.stopPropagation(); // Prevent parent click from triggering
  //   dispatch(setProductFilter({ lowestPrice: false }));
  //   setIsActive(false);
  // };

  return (
    <div className="flex lg:w-min items-center w-full lg:h-fit justify-center">
      <div
        onClick={onclick}
        className={`relative h-fit  lg:w-fit flex lg:pt-[2px]  md:px-2 xl:px-4 items-center rounded-[8px] text-sm lg:text-sm font-medium tracking-[0.02em] decoration-skip-ink-none decoration-from-font cursor-pointer ${
          isActive ? ' text-orange-400 underline lg:font-bold border-[#FF7F32]' : 'border-black'
        } w-auto min-w-[120px] max-w-[300px]`}
      >
        <span className=" lg:ml-1 w-full flex justify-center">{label}</span>
      </div>
    </div>
  );
};

export default SortCondition;
