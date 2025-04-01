'use client'
import { Product } from '@/state/types';
import React from 'react';

interface ProductStoreProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductStoreProps) {

  return (
    <>
      <div className="flex justify-start gap-10 items-center">
        <div className="text-black text-[24px] font-[600]">
          {product.vendor?.companyName}
        </div>
        <div className="font-[600] border-2 text-[#202122] rounded p-1 border-[#0061F2] ">
          View Store
        </div>
      </div>
      <div className="text-[#404040] mt-4 font-[600] ">Product Description</div>
      <div className="text-[#404040] mt-2">
        {product.description}
      </div>
    </>
  );
}
