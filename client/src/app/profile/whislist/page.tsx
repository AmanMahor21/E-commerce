'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Sidebar from '../Sidebar/page';
import { Product } from '@/services/types';
import { useSelector } from 'react-redux';
import { useGetFavProductsQuery, useRemoveFavProductMutation } from '@/services/api';
import { useDispatch } from 'react-redux';
import { setFavProducts } from '@/reduxStore/internalSlice';
// import ProductCard from '../../categories/ProductCard/index';
import { ProductCardSkeleton } from '../components/ProductCardSkelton';

type Store = {
  id: number;
  image: string;
  name: string;
  rating: number;
  price: string;
  label: string;
};

const storeData: Store[] = [
  {
    id: 1,
    image: '/Snack.svg',
    name: 'Andhra Picks & Snacks',
    rating: 4.8,
    price: '₹299',
    label: 'best seller',
  },
  {
    id: 2,
    image: '/Snack.svg',
    name: 'Rajasthan Delights',
    rating: 4.6,
    price: '₹399',
    label: 'top rated',
  },
];
export default function ProductPage() {
  const state = useSelector((state: any) => state.internal);
  const { data, isLoading } = useGetFavProductsQuery(undefined, { skip: !state.mail });
  const productsList: Product[] = data?.data ?? [];
  return (
    <div className="flex min-h-screen justify-center lg:justify-end bg-[#F5F5F5] mt-[96px]">
      <Sidebar />

      <div className=" p-8  lg:w-[calc(100%-280px)]">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Favorite Products</h2>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : productsList?.map((product) => (
                <ProductCard key={product?.productId} product={product} />
              ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Favorite Stores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeData.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const BASE_URL = process.env.BASE_URL;
  const imageUrl =
    product?.imagePath && product?.image
      ? `${BASE_URL}?path=${product.imagePath}/&name=${encodeURIComponent(product.image)}`
      : '/Offer2.svg';

  const [removeFavProduct] = useRemoveFavProductMutation();
  const state = useSelector((state: any) => state.internal);
  const { refetch } = useGetFavProductsQuery(undefined, { skip: !state.mail });

  const handleDeleteBtn = async () => {
    const response = await removeFavProduct(Number(product.productFavId) as number);
    if (response?.data?.status == 1) {
      const updatedData = await refetch();
      if (updatedData?.data?.data) {
        dispatch(setFavProducts(updatedData.data.data));
      }
    }
  };

  return (
    <div className="pb-7 w-full">
      <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8 p-4 lg:p-8 shadow-lg rounded-lg bg-gray-100 w-full max-w-6xl mx-auto hover:shadow-xl transition-shadow duration-300 min-h-[270px]">
        {/* Image */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex justify-center items-center">
          <img
            src={imageUrl}
            alt={product?.name || 'Product image'}
            className="w-full max-w-xs md:max-w-sm h-auto max-h-[300px] rounded-lg object-cover hover:scale-105 transition-transform duration-300 overflow-hidden"
          />
        </div>

        {/* Details */}
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
                  ₹{Math.max(Number(product.price) - 75, 0)}
                </span>
                <span className="text-base md:text-lg text-gray-500 line-through">
                  ₹{product.price}
                </span>
              </div>
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold w-fit">{`${product.discount}% OFF`}</div>
            </div>
          </div>

          <button
            className="mt-4 w-full sm:w-64 lg:w-72 h-12 lg:h-14 text-white font-semibold
                       text-base md:text-lg rounded-lg bg-black hover:bg-gray-800
                       transition-all duration-200"
          >
            Move to Cart
          </button>
        </div>

        {/* Rating & Heart */}
        <div className="flex flex-row items-end justify-end lg:justify-between w-full lg:w-auto space-x-4 lg:space-y-4 lg:h-auto">
          <div className="flex items-center bg-orange-100 px-3 py-1.5 rounded-full">
            <img src="/RatingStarYello.svg" alt="rating" className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span className="text-sm md:text-base font-semibold">{product?.rating}</span>
          </div>

          <div className="w-8 h-8 cursor-pointer" onClick={handleDeleteBtn}>
            <img src="/iconoir_heart.svg" alt="wishlist" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreCard({ store }: { store: Store }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full pt-[55%]">
        <Image src={store.image} alt={`${store.name}`} fill className="object-cover" />
        sssssss
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-medium">{store.name}</h2>
          <div className="flex items-center gap-1 bg-orange-50 px-6 py-1 rounded-full">
            <Star className="w-6 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-md font-medium">{store.rating}</span>
          </div>
        </div>
        <div className="mr-[27px] flex mt-[10px] w-[198px] h-[32px] gap-[150px] mb-[33px]">
          <div className="pb-[2px] flex items-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.75"
                d="M24.3035 1.7069C24.0814 1.48224 23.8169 1.30402 23.5252 1.18262C23.2336 1.06122 22.9207 0.999057 22.6048 0.999762H16.0194C15.5874 1.00057 15.1731 1.17169 14.8665 1.47601L1.70151 14.6383C1.25229 15.0885 1 15.6984 1 16.3344C1 16.9703 1.25229 17.5803 1.70151 18.0304L7.96928 24.2982C8.41954 24.7476 9.02971 25 9.66587 25C10.302 25 10.9122 24.7476 11.3625 24.2982L24.5221 11.1412C24.827 10.8351 24.9988 10.421 25 9.98893V3.39973C25.0019 3.08548 24.9413 2.77398 24.8218 2.48336C24.7022 2.19274 24.5261 1.9288 24.3035 1.7069ZM19.8572 7.85682C19.5181 7.85682 19.1867 7.75628 18.9048 7.56791C18.6229 7.37954 18.4031 7.11181 18.2734 6.79857C18.1436 6.48533 18.1097 6.14065 18.1758 5.80812C18.242 5.47558 18.4053 5.17013 18.645 4.93038C18.8847 4.69064 19.1902 4.52737 19.5227 4.46123C19.8553 4.39508 20.1999 4.42903 20.5132 4.55878C20.8264 4.68853 21.0942 4.90825 21.2825 5.19016C21.4709 5.47207 21.5714 5.8035 21.5714 6.14255C21.5714 6.5972 21.3908 7.03323 21.0693 7.35472C20.7478 7.67621 20.3118 7.85682 19.8572 7.85682Z"
                stroke="#FFA500"
                strokeWidth="1.5"
              />
            </svg>
            <span className="w-[145px] h-[30px] ml-[8px] font-poppins text-[20px] font-medium leading-[30px] text-left decoration-skip-ink-none decoration-from-font">
              Start from {store.price}
            </span>
          </div>
          <div className="w-[135px] h-[30px] flex gap-[8px]">
            <div>
              <svg
                width="26"
                height="24"
                viewBox="0 0 26 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.75">
                  <path
                    d="M10.4815 16.148L14.037 17.3332C14.037 17.3332 22.9259 15.5554 24.1111 15.5554C25.2963 15.5554 25.2963 16.7406 24.1111 17.9258C22.9259 19.111 18.7778 22.6665 15.2222 22.6665C11.6667 22.6665 9.2963 20.8888 6.92593 20.8888H1"
                    stroke="#FFA500"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 13.7777C2.18519 12.5925 4.55556 10.8147 6.92593 10.8147C9.2963 10.8147 14.9259 13.1851 15.8148 14.3703C16.7037 15.5555 14.037 17.3333 14.037 17.3333M8.11111 7.25918V2.51844C8.11111 2.20411 8.23598 1.90265 8.45824 1.68038C8.68051 1.45812 8.98197 1.33325 9.2963 1.33325H23.5185C23.8328 1.33325 24.1343 1.45812 24.3566 1.68038C24.5788 1.90265 24.7037 2.20411 24.7037 2.51844V11.9999"
                    stroke="#FFA500"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.4453 1.33325H19.3712V6.66659H13.4453V1.33325Z"
                    stroke="#FFA500"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
            <span className="w-[103px] h-[30px] font-poppins text-[20px] font-medium leading-[30px] text-left decoration-skip-ink-none decoration-from-font ">
              {store.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
