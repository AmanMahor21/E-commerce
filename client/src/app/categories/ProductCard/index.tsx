import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

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
import { fetchImages } from '@/utils/hooks';
interface ProductCardProps {
  product: Product;
  // handleSaveBtn: (e: React.MouseEvent, product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const ProductCard: React.FC<ProductCardProps> = ({ product, handleSaveBtn }) => {
  const BASE_URL = process.env.BASE_URL;
  const cartItem = useSelector((state: any) => state.internal.cartItemId);
  const [imageUrl, setImageUrl] = useState('/Offer2.svg');

  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [saveFavProduct, { data, isLoading, error }] = useSaveFavProductMutation();

  const [removeFavProduct, { data: response, isLoading: loading, error: err }] =
    useRemoveFavProductMutation();
  const [addProdToCart] = useAddToCartMutation();
  const { data: cartProducts } = useGetCartProductsQuery();

  const internalState = useSelector((state: any) => state.internal);
  const productState = useSelector((state: any) => state.product);
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
    // Swal.fire({
    //   position: 'top',
    //   icon: 'warning',
    //   showClass: {
    //     popup: `
    //       animate__animated
    //       animate__fadeInUp
    //       animate__faster
    //     `,
    //   },
    //   hideClass: {
    //     popup: `
    //       animate__animated
    //       animate__fadeOutDown
    //       animate__faster
    //     `,
    //   },
    //   customClass: {
    //     popup: 'custom-swal-style', // Apply styles only to this alert
    //   },
    //   title: 'Please login',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });

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

  useEffect(() => {
    const loadImage = async () => {
      if (product?.name) {
        const url = await fetchImages(productState?.keyword);
        if (url) setImageUrl(url);
      }
    };

    loadImage();
  }, [product?.name]);

  const handleProductDetail = () => {
    router.push(`/product/${product.productSlug}/${encodeURIComponent(product?.productId)}`);
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
        <div className="w-full lg:w-1/3 xl:w-1/4 flex justify-center items-center  cursor-pointer">
          <img
            src={imageUrl}
            alt={product?.name || 'Product image'}
            onError={(e) => {
              e.currentTarget.src = '/product-fallback.png'; // fallback image path
            }}
            className="w-full max-w-xs md:max-w-sm h-auto max-h-[300px] rounded-lg object-cover hover:scale-105 transition-transform duration-300 overflow-hidden"
          />
        </div>

        {/* Product Details - Flex column that grows to fill space */}
        <div className="flex-0 flex flex-col justify-between w-full lg:w-[60%] space-y-2 lg:space-y-3  cursor-pointer">
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
            // onclick={(e) => handleAddTocart }
          >
            {isAlreadyAdded ? 'Go to Cart' : 'Add to Cart'}
          </button>
        </div>

        {/* Rating & Wishlist - Now properly aligned to bottom */}
        <div className="flex flex-row items-end  justify-end lg:justify-between w-full lg:w-auto space-x-4 lg:space-y-4 lg:h-auto">
          <div className="flex items-center bg-orange-100 px-3 py-1.5 rounded-full">
            <img src="/RatingStarYello.svg" alt="rating" className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span className="text-sm md:text-base font-semibold">{product?.rating}</span>
          </div>

          <div
            className={`w-8 h-8 cursor-pointer ${isFavorite ? 'scale-110' : ''}`}
            // onClick={(e) => handleSaveBtn(e, product)}
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
};

export default ProductCard;
