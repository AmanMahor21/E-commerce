'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import Sidebar from '../Sidebar';
import DealsFilter from '../Filter/Deals';
import DeliveryFilter from '../Filter/FreeDelivery';
import PopularityFilter from '../Filter/Popularity';
import PriceFilter from '../Filter/Price';
import RatingFilter from '../Filter/Rating';
// import { Product } from './ProductCard';
import { useSelector } from 'react-redux';
import { useGetCartProductsQuery, useGetFavProductsQuery } from '@/services/api';
import { setFavProducts } from '@/reduxStore/internalSlice';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { SortBy } from '@/utils/helpers';
import SortCondition from '../Filter/SortBy/SortComponent';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';

export default function Categories() {
  const [activeName, setActiveName] = useState('Hello!'); // State for active item's name
  const [selectedSort, setSelectedSort] = useState('');
  const internalState = useSelector((state: any) => state.internal);
  const productState = useSelector((state: any) => state.product); // get all filters

  const dispatch = useDispatch();

  const { data, isLoading } = useGetFavProductsQuery();
  const filters = ['Popularity', 'Price--Low to High', 'Price--High to Low'];

  useEffect(() => {
    if (data?.data) {
      dispatch(setFavProducts(data?.data));
    }
  }, [data]);

  return (
    <div className="pb-[125px] pt-24   dark: bg-white text-black">
      <div className="flex">
        {/* Pass setActiveName as a prop */}
        <Sidebar setActiveName={setActiveName} />
        <div className="w-full pt-4 ">
          <div className=" flex px-[54px] lg:w-full justify-around flex-wrap gap-2 pb-3">
            <div className="text-[24px] hidden font-semibold mb-4  items-center justify-center w-[20%]">
              {activeName}
            </div>
            <div className="w-full hidden lg:flex justify-center lg:justify-around pb-4">
              <div className="flex">
                <p className="font-bold whitespace-nowrap">Filter By :</p>
                <RatingFilter />
                <DeliveryFilter />
              </div>
              <div className="flex">
                <p className="font-bold whitespace-nowrap">Sort By :</p>
                {SortBy.map((ele, ind) => {
                  const [key, value] = Object.entries(ele)[0]; // grabs the only key-value pair from each object

                  // const value = ele[key]
                  console.log(key, 'nnnnnnn');
                  console.log(value, 'calueb nnnnnnn');
                  return (
                    <SortCondition
                      key={ind}
                      filterKey={key}
                      label={value}
                      isActive={key == productState.sortBy}
                      onclick={() => dispatch(setProductFilter({ sortBy: key }))}
                      // onclick={() => setSelectedSort(key)}
                    />
                  );
                })}
                {/* <PopularityFilter />
                <PriceFilter /> */}
              </div>
            </div>
            <Dropdown className=" lg:hidden !w-[30%] grow">
              <Dropdown.Toggle className="!flex !grow !items-center !justify-between !w-[100%] !px-4 !py-2 !bg-stone-700 !text-white !border !border-stone-700 hover:!bg-stone-800 focus:!bg-stone-700 focus:!ring-0 active:!bg-stone-800 after:!ml-2 after:!border-t-white">
                <span className="flex-1 text-left">filter</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="!bg-stone-200 !border-none !border-stone-500 !w-[100%]">
                <Dropdown.Item>
                  <RatingFilter />
                </Dropdown.Item>
                <Dropdown.Item>
                  <DeliveryFilter />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className=" lg:hidden !w-[30%] grow ">
              <Dropdown.Toggle className="!flex !grow  !items-center !justify-between !w-[100%] !px-4 !py-2 !bg-stone-700 !text-white !border !border-stone-700 hover:!bg-stone-800 focus:!bg-stone-700 focus:!ring-0 active:!bg-stone-800 after:!ml-2 after:!border-t-white">
                <span className="flex-1 text-left">Sort</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="!bg-stone-200 !border-none !border-stone-500 !w-[100%]">
                <Dropdown.Item>
                  <PopularityFilter />
                </Dropdown.Item>
                <Dropdown.Item>
                  <PriceFilter />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="flex flex-col px-[54px]">
            {internalState?.products?.map((product: any, ind: number) => (
              // {mockProducts.map((product) => (
              <ProductCard key={ind} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client';
// import React, { useEffect, useState } from 'react';
// import ProductCard from '../ProductCard';
// import Sidebar from '../Sidebar';
// import DealsFilter from '../Filter/Deals';
// import DeliveryFilter from '../Filter/FreeDelivery';
// import PopularityFilter from '../Filter/Popularity';
// import PriceFilter from '../Filter/Price';
// import RatingFilter from '../Filter/Rating';
// // import { Product } from './ProductCard';
// import { useSelector } from 'react-redux';
// import { useGetCartProductsQuery, useGetFavProductsQuery } from '@/services/api';
// import { setFavProducts } from '@/reduxStore/internalSlice';
// import { useDispatch } from 'react-redux';
// import { Dropdown } from 'react-bootstrap';
// import { SortBy } from '@/utils/helpers';
// import SortCondition from '../Filter/SortBy/SortComponent';

// export default function Categories() {
//   const [activeName, setActiveName] = useState('Hello!'); // State for active item's name
//   const internalState = useSelector((state: any) => state.internal);
//   const dispatch = useDispatch();

//   const { data, isLoading } = useGetFavProductsQuery();
// const  filters = [ 'Popularity', 'Price--Low to High', 'Price--High to Low']

//   useEffect(() => {
//     if (data?.data) {
//       dispatch(setFavProducts(data?.data));
//     }
//   }, [data]);

//   return (
//     <div className="pb-[125px] pt-24   dark: bg-white text-black">
//       <div className="flex">
//         {/* Pass setActiveName as a prop */}
//         <Sidebar setActiveName={setActiveName} />
//         <div className="w-full pt-4 ">
//           <div className=" flex px-[54px] lg:w-full justify-around flex-wrap gap-2 pb-3">
//             <div className="text-[24px] hidden font-semibold mb-4  items-center justify-center w-[20%]">
//               {activeName}
//             </div>
//             <div className="w-full hidden lg:flex justify-around pb-4">
//               <div className="flex">
//                 <p className="font-bold">Filter By :</p>
//                 <RatingFilter />
//                 <DeliveryFilter />
//               </div>
//               <div className="flex">
//                 <p className="font-bold">Sort By :</p>
//                 <PopularityFilter />
//                 <PriceFilter />
//               </div>
//             </div>
//             <Dropdown className=" lg:hidden !w-[30%] grow">
//               <Dropdown.Toggle className="!flex !grow !items-center !justify-between !w-[100%] !px-4 !py-2 !bg-stone-700 !text-white !border !border-stone-700 hover:!bg-stone-800 focus:!bg-stone-700 focus:!ring-0 active:!bg-stone-800 after:!ml-2 after:!border-t-white">
//                 <span className="flex-1 text-left">filter</span>
//               </Dropdown.Toggle>

//               <Dropdown.Menu className="!bg-stone-200 !border-none !border-stone-500 !w-[100%]">
//                 <Dropdown.Item>
//                   <RatingFilter />
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <DeliveryFilter />
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>

//             <Dropdown className=" lg:hidden !w-[30%] grow ">
//               <Dropdown.Toggle className="!flex !grow  !items-center !justify-between !w-[100%] !px-4 !py-2 !bg-stone-700 !text-white !border !border-stone-700 hover:!bg-stone-800 focus:!bg-stone-700 focus:!ring-0 active:!bg-stone-800 after:!ml-2 after:!border-t-white">
//                 <span className="flex-1 text-left">Sort</span>
//               </Dropdown.Toggle>

//               <Dropdown.Menu className="!bg-stone-200 !border-none !border-stone-500 !w-[100%]">
//                 <Dropdown.Item>
//                   <PopularityFilter />
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <PriceFilter />
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//           <div className="flex flex-col px-[54px]">
//             {internalState?.products?.map((product: any, ind: number) => (
//               // {mockProducts.map((product) => (
//               <ProductCard key={ind} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
