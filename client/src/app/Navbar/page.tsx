// 'use client';

// import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
// import { useGetCartProductsQuery, useLazyGetFilterProductsQuery } from '@/services/api';
// import { resetProductInput, setFethedProducts } from '@/reduxStore/internalSlice';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { AddressPopup } from './component/AddressPopup';
// import SpeechToText from './component/SpeechToText';
// import { Dropdown } from './component/profileDropdown';

// export default function Page() {
//   const dispatch = useDispatch();
//   const filters = useSelector((state: any) => state.product);
//   const internalState = useSelector((state: any) => state.internal);
//   const { listening, handleSpeech, setProductName, productName } = SpeechToText();
//   const [isOpenAddress, setIsOpenAddress] = useState(false);
//   const [fetchProducts] = useLazyGetFilterProductsQuery();
//   const router = useRouter();
//   const { data: cartProducts } = useGetCartProductsQuery();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (!filters.keyword) return;
//     const handleFetchProducts = async () => {
//       const response = await fetchProducts(filters);
//       if (response?.data?.data) {
//         dispatch(setFethedProducts(response.data.data));
//       }
//     };
//     handleFetchProducts();
//   }, [filters]);

//   console.log(internalState.mail, 'stttt');
//   const query = searchParams.get('query');
//   useEffect(() => {
//     dispatch(setProductFilter({ ...filters, keyword: query }));
//   }, [searchParams]);

//   const handleProductSearch = (e: any) => {
//     if (productName?.trim() === '') return;
//     dispatch(setProductFilter({ ...filters, keyword: productName }));
//     if (internalState?.isCategoryActive) dispatch(resetProductInput(false));
//     router.push(`/search?query=${encodeURIComponent(productName)}`);
//   };

//   useEffect(() => {
//     if (internalState?.isCategoryActive) {
//       setProductName('');
//     }
//   }, [internalState?.isCategoryActive]);

//   const handleOrders = () => {
//     router.push('/cart');
//   };

//   return (
//     <div>
//       <div className="w-full fixed top-0 z-[100] bg-white shadow-xl grid place-items-center">
//         <div className="w-full h-[70px] lg:h-[96px] flex items-center justify-between px-4 lg:px-10">
//           {/* Logo */}
//           <div
//             className="flex items-center cursor-pointer"
//             onClick={() => router.push('/HomePage')}
//           >
//             <Image src="/logo.png" alt="YumMate logo" width={50} height={50} />
//           </div>

//           {/* Address */}
//           <div
//             className="hidden md:flex items-center lg:ml-4 cursor-pointer"
//             onClick={() => setIsOpenAddress(true)}
//           >
//             <Image
//               src="/Location.svg"
//               alt="Location logo"
//               width={20}
//               height={20}
//               className="mr-1"
//             />
//             <p className="text-sm lg:text-base font-medium">Deliver to choose Location</p>
//           </div>

//           {/* Search Bar */}
//           <div className="w-full max-w-[700px] flex items-center bg-[#EFEFF2] rounded-lg p-2">
//             <input
//               type="text"
//               value={productName}
//               placeholder="Search for 'snacks'"
//               onChange={(e: any) => setProductName(e.target.value)}
//               className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
//               onKeyDown={(e) => e.key === 'Enter' && handleProductSearch(e)}
//             />
//             <div className="flex items-center gap-2">
//               <Image
//                 src="/Search.svg"
//                 alt="Search"
//                 width={24}
//                 height={24}
//                 onClick={handleProductSearch}
//               />
//               <Image src="/Vertical_Line.svg" alt="Divider" width={20} height={20} />
//               <Image
//                 src={listening ? '/BlueMic.svg' : '/Mic.svg'}
//                 alt="Mic"
//                 width={23}
//                 height={23}
//                 onClick={handleSpeech}
//               />
//             </div>
//           </div>

//           {/* Orders & Cart */}
//           <div className="flex items-center gap-4">
//             <div
//               className="hidden md:flex items-center text-lg font-medium cursor-pointer"
//               onClick={() => router.push('/Profile/orders')}
//             >
//               Orders <Image src="/Orders.svg" alt="Orders" width={30} height={30} />
//             </div>
//             <div
//               className="relative flex items-center text-sm sm:text-base md:text-lg font-medium cursor-pointer"
//               onClick={handleOrders}
//             >
//               Cart
//               <div className="relative ml-2">
//                 <Image
//                   src="/Cart.svg"
//                   alt="Cart"
//                   width={30}
//                   height={30}
//                   className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
//                 />
//                 {cartProducts?.data && (
//                   <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-xs md:text-sm font-bold px-[6px] py-[2px] rounded-full flex items-center justify-center min-w-[16px] sm:min-w-[18px] md:min-w-[20px]">
//                     {cartProducts.data.length}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* SignUp/Login */}
//           {!internalState?.mail ? (
//             <div className="hidden lg:flex">
//               <div
//                 className="px-4 py-2 bg-[#0061F2] text-white font-bold text-sm rounded-md cursor-pointer"
//                 onClick={() => router.push('/login')}
//               >
//                 SignUp/Login
//               </div>
//             </div>
//           ) : (
//             ''
//           )}
//           <Dropdown />
//         </div>
//       </div>
//       {isOpenAddress && <AddressPopup onClose={() => setIsOpenAddress(false)} />}
//     </div>
//   );
// }
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
      <div className="w-full fixed top-0 z-[100] bg-slate-800 shadow-xl grid place-items-center">
        <div className="w-full h-[70px] lg:h-[96px] flex items-center justify-between px-4 lg:px-10">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push('/HomePage')}
          >
            <Image src="/logo.png" alt="YumMate logo" width={50} height={50} />
          </div>

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
              className="mr-1"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm lg:text-base font-medium">Deliver to choose Location</p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-[700px] flex items-center bg-slate-700 rounded-lg p-2">
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
              <Image src="/Vertical_Line.svg" alt="Divider" width={20} height={20} />
              <img
                src={listening ? '/BlueMic.svg' : '/Mic.svg'}
                alt="Mic"
                width={23}
                height={23}
                className="cursor-pointer"
                onClick={handleSpeech}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>

          {/* Orders & Cart */}
          <div className="flex items-center gap-20">
            <div
              className="hidden md:flex items-center text-lg font-medium cursor-pointer text-gray-300 hover:text-white"
              onClick={() => router.push('/Profile/orders')}
            >
              Orders{' '}
              <Image
                src="/Orders.svg"
                alt="Orders"
                width={30}
                height={30}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div
              className="relative flex items-center text-sm sm:text-base md:text-lg font-medium cursor-pointer text-gray-300 hover:text-white"
              onClick={handleOrders}
            >
              Cart
              <div className="relative">
                <img
                  src="/Cart.svg"
                  alt="Cart"
                  width={30}
                  height={30}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-white text-white"
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
          {!internalState?.mail && (
            <div className="hidden lg:flex">
              <div
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-md cursor-pointer transition-all duration-200"
                onClick={() => router.push('/login')}
              >
                SignUp/Login
              </div>
            </div>
          )}
          <Dropdown />
        </div>
      </div>
      {isOpenAddress && <AddressPopup onClose={() => setIsOpenAddress(false)} />}
    </div>
  );
}
