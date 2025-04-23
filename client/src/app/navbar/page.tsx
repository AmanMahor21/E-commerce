'use client';

import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useGetCartProductsQuery, useLazyGetFilterProductsQuery } from '@/services/api';
import { resetProductInput, setFethedProducts } from '@/reduxStore/internalSlice';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AddressPopup } from './component/AddressPopup';
import SpeechToText from './component/SpeechToText';
import { Dropdown } from './component/profileDropdown';

export default function Page() {
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.product);
  const internalState = useSelector((state: any) => state.internal);
  const { listening, handleSpeech, setProductName, productName } = SpeechToText();
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [fetchProducts] = useLazyGetFilterProductsQuery();
  const router = useRouter();
  const { data: cartProducts } = useGetCartProductsQuery();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(filters, 'filters ');
    if (!filters.keyword) return;
    const handleFetchProducts = async () => {
      const response = await fetchProducts(filters);
      if (response?.data?.data) {
        dispatch(setFethedProducts(response.data.data));
      }
    };
    handleFetchProducts();
  }, [filters]);

  const query = searchParams.get('query');
  useEffect(() => {
    dispatch(setProductFilter({ ...filters, keyword: query }));
  }, [searchParams]);

  const handleProductSearch = (e: any) => {
    if (productName?.trim() === '') return;
    dispatch(setProductFilter({ ...filters, keyword: productName }));
    if (internalState?.isCategoryActive) dispatch(resetProductInput(false));
    router.push(`/search?query=${encodeURIComponent(productName)}`);
  };

  useEffect(() => {
    if (internalState?.isCategoryActive) {
      setProductName('');
    }
  }, [internalState?.isCategoryActive]);

  const handleOrders = () => {
    router.push('/cart');
  };

  return (
    <div>
      <div className="w-full fixed top-0 z-[100] bg-slate-800 shadow-xl grid place-items-center px-2 md:px-4 xl:px-10">
        <div className="w-full h-[70px] lg:h-[96px] gap-1 md:gap-2 flex items-center justify-between  ">
          {/* Logo */}
          <div
            className="flex items-center  gap-0 cursor-pointer text-orange-500 font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-wide"
            onClick={() => router.push('/')}
          >
            <span className="text-gray-400 font-cherry">Trend</span>
            <span className="text-orange-500">ify</span>
          </div>

          {/* <Image
              src="/logo.png"
              alt="YumMate logo"
              width={50}
              height={50}
              className="w-8 h-8 lg:w-14 lg:h-14 inline-block"
            /> */}

          {/* Address */}
          <div
            className="hidden md:flex items-center lg:ml-4 cursor-pointer text-gray-300 hover:text-white"
            onClick={() => setIsOpenAddress(true)}
          >
            <img
              src="/Location.svg"
              alt="Location logo"
              width={20}
              height={20}
              className="mr-1 "
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm hidden lg:flex lg:text-base font-medium">
              Deliver to choose Location
            </p>
          </div>

          {/* Search Bar */}
          <div className=" w-[70%] max-w-[700px] flex items-center bg-slate-700 rounded-lg p-2">
            <input
              type="text"
              value={productName}
              placeholder="Search for 'snacks'"
              onChange={(e: any) => setProductName(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleProductSearch(e)}
            />
            <div className="flex items-center gap-2">
              <img
                src="/Search.svg"
                alt="Search"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={handleProductSearch}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <Image
                src="/Vertical_Line.svg"
                alt="Divider"
                width={20}
                height={20}
                className="hidden lg:flex"
              />
              <img
                src={listening ? '/BlueMic.svg' : '/Mic.svg'}
                alt="Mic"
                width={23}
                height={23}
                className="cursor-pointer hidden lg:flex"
                onClick={handleSpeech}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>

          {/* Orders & Cart */}
          <div className=" items-center xl:gap-[2vw] hidden xl:flex px-3">
            <div
              className="hidden md:flex items-center text-lg font-medium cursor-pointer text-gray-300 hover:text-white"
              onClick={() => router.push('/profile/orders')}
            >
              Orders
              <Image
                // className="hidden xl:flex"
                src="/Orders.svg"
                alt="Orders"
                width={30}
                height={30}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div
              className="hidden md:flex items-center text-lg font-medium cursor-pointer text-gray-300 hover:text-white"
              // className="relative flex items-center text-sm sm:text-base md:text-lg font-medium cursor-pointer text-gray-300 hover:text-white"
              onClick={handleOrders}
            >
              Cart
              <div className="relative">
                <img
                  src="/Cart.svg"
                  alt="Cart"
                  width={30}
                  height={30}
                  // className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 xl:w-11 xl:h-11 fill-white text-white"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                {cartProducts?.data && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-[6px] py-[2px] rounded-full flex items-center justify-center min-w-[16px] sm:min-w-[18px] md:min-w-[20px]">
                    {cartProducts.data.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SignUp/Login */}
          {!internalState?.customerInfo?.fName ? (
            <div className=" lg:flex" id="login-btn">
              <div
                className="px-2 md:px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-md cursor-pointer transition-all duration-200"
                onClick={() => router.push('/login')}
              >
                Login
              </div>
            </div>
          ) : (
            <Dropdown />
          )}
        </div>
      </div>
      {isOpenAddress && <AddressPopup onClose={() => setIsOpenAddress(false)} />}
    </div>
  );
}
