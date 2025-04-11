'use client';

// import parse from 'html-react-parser';
// import he from 'he';

import { setCartItemId } from '@/reduxStore/internalSlice';
import {
  useAddToCartMutation,
  useGetCartProductsQuery,
  useUpdateCartQuantityMutation,
} from '@/services/api';
import { AddToCart, Product } from '@/services/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

interface ProductStoreProps {
  product: Product; // Accept product prop
}

export default function ProductStore({ product }: ProductStoreProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [updateQuantity] = useUpdateCartQuantityMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [addProdToCart] = useAddToCartMutation();
  const { data: cartProducts } = useGetCartProductsQuery();

  // Handle Add to cart btn
  const handleAddTocart = async (e: any) => {
    e.stopPropagation();
    setIsAdded(!isAdded);
    const discountedPrice =
      product?.productDiscount && product.productDiscount > 0
        ? Number(product.productDiscount)
        : Number(product?.price);

    const cartItem: AddToCart = {
      productId: product?.productId,
      name: product?.name,
      total: Math.max(Number(product.price) - 75, 0),
      quantity: '1',
      productPrice: Math.max(Number(product.price) - 75, 0),
    };
    const response = await addProdToCart(cartItem);
    dispatch(setCartItemId(cartProducts?.data));
  };
  const handleQuantityChange = async (item: any, change: number) => {
    const newQuantity = item.cartQuantity + change;

    await updateQuantity({
      productId: item?.productId,
      quantity: newQuantity,
      total: item.price * newQuantity,
      // total: item.productDiscount
      //   ? newQuantity * item.productDiscount
      //   : newQuantity * item.productPrice,
    });
  };
  const productQuantity = Array.from({ length: 3 }).map((_, i) => i * 2);
  // const isAlreadyAdded = product?.some((ele: any) => ele.productId === product.productId);
  return (
    <div className="mt-22">
      <div className="lg:w-[650px] w-full px-2 h-full flex flex-col">
        <div className="w-full">
          <div className="text-black font-[500] text-[32px] mb-4">{product?.companyName}</div>
          <div className="mb-5">
            <div className="text-black font-[800] text-2xl lg:text-[32px] ">{product.name}</div>
            <div className="text-black font-[500] text-[18px]">
              {product.description}
              {/* dangerouslySetInnerHTML={{ __html: String(he.decode(product.description || '')) }} */}
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center mb-8">
          <div>
            <li className="text-black font-[600] text-[18px]">`${product.orderCount}k+ sold`</li>
          </div>
          <div className="flex justify-center items-center ml-20 gap-4 font-[600] text-black text-[18px]">
            <div>
              <Image src="/RatingStarBlack.svg" alt="Rating star" width={20} height={20} />
            </div>
            {product.rating} ({product.totalRatingCount} reviews)
          </div>
        </div>
        <div className="flex justify-start items-center mb-8">
          <div className="text-black text-[24px] font-[600] ">
            {`₹${Math.max(Number(product.price) - 75, 0)}`}
            <span className="line-through text-[#222222] text-[20px] font-[400]">
              {product.price}
            </span>
          </div>
          <div className="bg-[#D32F2F] rounded-tl-2xl rounded-br-2xl p-1 h-[30px] w-[80px] font-[500] text-[16px] ml-2">
            45% OFF
          </div>
        </div>
        <div className="flex gap-4 mb-8">
          <button className="flex border-2 border-black rounded-md lg:text-[16px] text-[12px] font-[700] text-black p-1 items-center justify-center">
            210-250g
          </button>
          <button className="flex border-2 border-black rounded-md lg:text-[16px] text-[12px] font-[700] text-black p-1 items-center justify-center">
            450g-500g
          </button>
          <button className="flex border-2 border-black rounded-md lg:text-[16px] text-[12px] font-[700] text-black p-1 items-center justify-center">
            900-1000g
          </button>
          <button className="flex border-2 border-black rounded-md lg:text-[16px] text-[12px] font-[700] text-black p-1 items-center justify-center">
            <span>Custom</span>
            <Image src="/DropDownArrowBlack.svg" alt="DropDownArrow Logo" width={25} height={25} />
          </button>
        </div>
        <Dropdown className="hidden">
          <Dropdown.Toggle className=" !lg:flex !items-center !justify-between !w-44 !px-4 !py-2 !bg-stone-700 !text-white !border !border-stone-700 hover:!bg-stone-800 focus:!bg-stone-700 focus:!ring-0 active:!bg-stone-800 after:!ml-2 after:!border-t-white">
            <span className="flex-1 text-left">Quantity</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="!bg-stone-200 !border !border-stone-500 !w-44">
            {Array.from({ length: 3 }).map((_, i: number) => (
              <Dropdown.Item
                key={i + 1}
                onClick={() => handleQuantityChange(product, i + 1)}
                className="!text-stone-800 hover:!bg-stone-400 hover:!text-white"
              >
                {i + 1}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <div className="flex gap-4 mt-4 justify-center">
          <div
            className={`w-[300px] rounded-sm text-white h-[40px] font-[600] text-[22px] flex justify-center items-center ${isAdded || Number(product.cartQuantity) ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-black hover:bg-gray-800'}`}
            onClick={isAdded ? () => router.push('/cart') : (e) => handleAddTocart(e)}
          >
            {isAdded || Number(product.cartQuantity) > 0 ? 'Go to Cart' : 'Add to Cart'}
          </div>
          <div
            className="w-[300px] bg-[#D32F2F] rounded-sm text-white h-[40px] font-[600] text-[22px] flex justify-center items-center"
            onClick={() => router.push('/checkout')}
          >
            Buy Now
          </div>
        </div>
      </div>
    </div>
  );
}
