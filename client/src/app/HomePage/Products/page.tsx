'use client';

import { useState } from 'react';
import ProductList from './ProductList/page';
import Image from 'next/image';

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="h-full w-full">
      {/* Dynamic Height Container */}
      <div
        className={`${
          isExpanded ? 'h-full' : 'h-[90vh]'
        } w-full flex flex-col justify-start items-start overflow-hidden transition-transform duration-1000  ease-in-out`}
      >
        <ProductList />
      </div>

      {/* Expand Button */}
      <div className="w-full h-[124px] flex justify-center items-center gap-5 pl-24 pr-24 bg-white">
        <button
          onClick={handleToggleExpand}
          className="w-full h-[80px] bg-[#FF7F32] text-[32px] font-[700] flex justify-center items-center gap-5 rounded-xl hover:bg-[#e96d29] transition-colors duration-300"
        >
          {isExpanded ? 'Collapse Categories' : 'View more Categories'}
          <Image
            src="/DropDownArrow.svg"
            alt="Drop Down Arrow Image"
            width={60}
            height={60}
            className={`transform ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            } transition-transform duration-1000`}
          />
        </button>
      </div>
    </div>
  );
}
