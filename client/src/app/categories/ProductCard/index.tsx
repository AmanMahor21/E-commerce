import React, { useEffect, useState } from 'react';
import {
  useAddToCartMutation,
  useGetCartProductsQuery,
  useRemoveFavProductMutation,
  useSaveFavProductMutation,
} from '@/services/api';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart, Product } from '@/services/types';
import { setCartItemId } from '@/reduxStore/internalSlice';
import { usePathname, useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const BASE_URL = process.env.BASE_URL;
  const cartItem = useSelector((state: any) => state.internal.cartItemId);

  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [saveFavProduct, { data, isLoading, error }] = useSaveFavProductMutation();
  const [addProdToCart] = useAddToCartMutation();
  const [removeFavProduct, { data: response, isLoading: loading, error: err }] =
    useRemoveFavProductMutation();
  const { data: cartProducts } = useGetCartProductsQuery();

  const internalState = useSelector((state: any) => state.internal);
  const isFavorite = internalState?.FavProducts?.some(
    (fav: any) => fav.productId === Number(product?.productId),
  );

  // Handle product Favourite btn
  const handleSaveBtn = async (e: any) => {
    e.stopPropagation();

    const alreadyFavourite = internalState?.FavProducts?.find(
      (fav: any) => fav.productId === Number(product?.productId),
    );
    if (alreadyFavourite) {
      removeFavProduct(alreadyFavourite?.productFavId);
    } else {
      const response = await saveFavProduct({ productId: product?.productId });
    }
  };

  // Handle Add to cart btn
  const handleAddTocart = async (e: any) => {
    e.stopPropagation();

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

  // Checking product already added in cart
  const isAlreadyAdded = cartProducts?.data?.some(
    (ele: any) => ele.productId === product.productId,
  );
  const originalPrice = Number(product?.price) || 0;
  const discountedPrice = Number(product?.productDiscount) || 0;

  const imageUrl =
    product?.imagePath && product?.image
      ? `${BASE_URL}?path=${product.imagePath}/&name=${encodeURIComponent(product.image)}`
      : '/Offer2.svg';

  const handleProductDetail = () => {
    router.push(`/product/${product.productSlug}/${encodeURIComponent(product?.productId)}`);
    // router.push(`/product?query=${encodeURIComponent(product.productId)}`);
  };

  const discountAmount = Math.min(75, originalPrice); // Max discount = 175 or original price
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

  return (
    <div className="pb-7 w-full">
      <div
        className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8
                   p-4 lg:p-8 shadow-lg rounded-lg bg-gray-100 w-full max-w-6xl mx-auto
                   hover:shadow-xl transition-shadow duration-300 min-h-[270px]"
        onClick={handleProductDetail}
      >
        {/* Product Image - Now using items-stretch to fill height */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex justify-center items-center">
          <img
            src={imageUrl}
            alt={product?.name || 'Product image'}
            className="w-full max-w-xs md:max-w-sm h-auto max-h-[300px] rounded-lg object-cover
                     hover:scale-105 transition-transform duration-300 overflow-hidden"
          />
        </div>

        {/* Product Details - Flex column that grows to fill space */}
        <div className="flex-0 flex flex-col justify-between w-full lg:w-[60%] space-y-2 lg:space-y-3">
          <div>
            <div className="text-sm md:text-base lg:text-lg font-medium text-gray-600">
              {product?.companyName}
            </div>

            <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 leading-tight">
              {product?.name}
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  ₹{Math.max(originalPrice - 75, 0)}
                </span>
                <span className="text-base md:text-lg text-gray-500 line-through">
                  ₹{originalPrice}
                </span>
              </div>
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold w-fit">
                {`${discountPercentage}% OFF`}
              </div>
            </div>
          </div>

          <button
            className={`mt-4 w-full sm:w-64 lg:w-72 h-12 lg:h-14 text-white font-semibold
                        text-base md:text-lg rounded-lg transition-all duration-200
                        ${isAlreadyAdded ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-black hover:bg-gray-800'}`}
            onClick={isAlreadyAdded ? () => router.push('/cart') : (e) => handleAddTocart(e)}
          >
            {isAlreadyAdded ? 'Go to Cart' : 'Add to Cart'}
          </button>
        </div>

        {/* Rating & Wishlist - Now properly aligned to bottom */}
        <div className="flex flex-row lg:flex-col items-center justify-end lg:justify-between w-full lg:w-auto space-x-4 lg:space-x-0 lg:space-y-4 lg:h-auto">
          <div className="flex items-center bg-orange-100 px-3 py-1.5 rounded-full">
            <img src="/RatingStarYello.svg" alt="rating" className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span className="text-sm md:text-base font-semibold">{product?.rating}</span>
          </div>

          <div
            className={`w-8 h-8 cursor-pointer ${isFavorite ? 'scale-110' : ''}`}
            onClick={handleSaveBtn}
          >
            <img
              src={isFavorite ? '/iconoir_heart.svg' : '/Heart.svg'}
              alt="wishlist"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="pb-[28px]">
  //     <div
  //       className="flex pt-[25px] h-[300px] shadow-2xl rounded-[12px] px-[45px]"
  //       onClick={handleProductDetail}
  //     >
  //       <div>
  //         <img src={imageUrl} alt="" className="w-[350px] h-[250px] gap-0 rounded-[8px]" />
  //       </div>
  //       <div className="w-[700px] h-[228px] ml-[80px] p-1">
  //         <div className="w-full h-[27px] font-sans text-[22px] font-medium leading-[26.63px] tracking-[0.02em] mb-[21px]">
  //           {product?.companyName}
  //         </div>
  //         <div className="w-full h-14 font-sans text-[22px] font-extrabold leading-[31.47px] tracking-[0.02em]">
  //           {product?.name}asd
  //         </div>
  //         <div className="flex items-center w-[318px] h-[38px] gap-6 mt-[26px]">
  //           <div className="flex items-center gap-6">
  //             <span className="font-serif text-[24px] font-bold ">
  //               ₹{Math.max(originalPrice - 75, 0)}
  //             </span>
  //             <span className="font-serif text-[20px] font-normal text-gray-500 line-through">
  //               ₹{originalPrice}
  //             </span>
  //           </div>
  //           <div className="w-[102px] h-[38px] rounded-tl-2xl rounded-br-2xl bg-[#D32F2F] p-[10px] flex justify-center items-center">
  //             <span className="text-white font-sans font-semibold">
  //               {`${discountPercentage}% OFF`}
  //             </span>
  //           </div>
  //         </div>
  //         <button
  //           className={`py-[11.5px] px-[75px] mt-[20px] w-[300px] h-[54px] ${isAlreadyAdded ? 'bg-yellow-800' : 'bg-black'}  text-white font-sans text-[26px] font-semibold leading-[31.47px] tracking-[0.02em] text-center gap-[10px] rounded-[4px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400`}
  //           onClick={isAlreadyAdded ? () => router.push('/cart') : handleAddTocart}
  //         >
  //           {isAlreadyAdded ? 'Go to Cart' : 'Add to Cart'}
  //         </button>
  //       </div>
  //       <div className="ml-auto">
  //         <div className="w-[195px] h-[51px] flex items-center justify-center bg-[#FFE1CE] rounded-[30px] gap-[10px] hover:cursor-pointer">
  //           <div className="w-[32px] h-[32px]">
  //             <svg
  //               width="32"
  //               height="30"
  //               viewBox="0 0 32 30"
  //               fill="none"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 d="M16 0.5L19.5922 11.5557H31.2169L21.8123 18.3885L25.4046 29.4443L16 22.6115L6.59544 29.4443L10.1877 18.3885L0.783095 11.5557H12.4078L16 0.5Z"
  //                 fill="black"
  //               />
  //             </svg>
  //           </div>
  //           <span className="font-inter text-2xl font-semibold leading-[31.47px] tracking-[0.02em] items-center decoration-solid decoration-from-font">
  //             {/* {rating} ({reviews}) */}
  //             {product?.rating}
  //           </span>
  //         </div>
  //         <div
  //           className={`w-[26.67px] h-[24px] mt-[131px] ml-[122.67px] hover:cursor-pointer ${isFavorite ? 'w-[37px] h-[37px]' : ''}`}
  //         >
  //           <img
  //             // src="/Heart.svg"
  //             onClick={handleSaveBtn}
  //             src={isFavorite ? '/iconoir_heart.svg' : '/Heart.svg'}
  //             alt="heart"
  //             className={`w-full h-full `}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ProductCard;
