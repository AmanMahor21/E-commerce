'use client';

import Card from '../Card/page';
import { useEffect } from 'react';
import { MdCurrencyRupee } from 'react-icons/md';
import { useGetCartProductsQuery, useUpdateCartQuantityMutation } from '@/services/api';
import { useDispatch } from 'react-redux';
import { setCartItemId } from '@/reduxStore/internalSlice';

export default function OrderSummary() {
  const { data } = useGetCartProductsQuery();
  const [updateQuantity] = useUpdateCartQuantityMutation();
  const dispatch = useDispatch();
  const BASE_URL = process.env.BASE_URL;

  // Handle cart item's Quantity Change
  const handleQuantityChange = async (item: any, change: number) => {
    const newQuantity = item.quantity + change;

    await updateQuantity({
      productId: item?.productId,
      quantity: newQuantity,
      total: item.productPrice * newQuantity,
      // total: item.productDiscount
      //   ? newQuantity * item.productDiscount
      //   : newQuantity * item.productPrice,
    });
  };

  useEffect(() => {
    if (data?.data) {
      dispatch(setCartItemId(data?.data));
    }
  }, [data?.data]);

  return (
    <Card className="mt-10 p-6">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="text-left p-4 text-lg md:text-xl">Product</th>
            <th className="text-left p-4 text-lg md:text-xl">Price</th>
            <th className="text-center p-4 text-lg md:text-xl">Quantity</th>
            <th className="text-left p-4 text-lg md:text-xl">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => {
            const imageUrl =
              item?.imagePath && item?.image
                ? `${BASE_URL}?path=${item.imagePath}&name=${encodeURIComponent(item.image)}&width=200&height=200`
                : '/Offer2.svg';

            return (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt={item.name || 'Product Image'}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>

                    <div className="">
                      <p className="text-sm text-gray-600">{item.companyName || 'Seller'}</p>
                      <p className="text-xl line-clamp-3">{item.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1 text-lg font-semibold">
                    <MdCurrencyRupee />
                    {`₹${item.productPrice}`}
                    {/* <span>{item.productDiscount || item.productPrice}</span> */}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="border border-gray-300 rounded-md w-24 flex items-center justify-between px-2 py-1">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      className="text-lg font-bold px-2"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, +1)}
                      className="text-lg font-bold px-2"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1 text-lg font-semibold">
                    <MdCurrencyRupee />
                    <span>{Number(item.total).toFixed(2)}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

// 'use client';

// import Card from '../Card/page';
// import { useEffect, useState } from 'react';
// import { MdCurrencyRupee } from 'react-icons/md';
// import ProductImg1 from '../../../../public/ProductImage.svg';
// import Image from 'next/image';
// import { useGetCartProductsQuery, useUpdateCartQuantityMutation } from '@/services/api';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { setCartItemId } from '@/reduxStore/internalSlice';

// let OrderArr = [
//   {
//     store_name: 'Avakaya Pickle Store',
//     product_name: 'Mango Pickle (250 g)',
//     price: 329,
//     quantity: 1,
//     image: ProductImg1,
//   },
//   {
//     store_name: 'Avakaya Pickle Store',
//     product_name: 'Mango Pickle (250 g)',
//     price: 329,
//     quantity: 1,
//     image: ProductImg1,
//   },
//   {
//     store_name: 'Avakaya Pickle Store',
//     product_name: 'Mango Pickle (250 g)',
//     price: 329,
//     quantity: 1,
//     image: ProductImg1,
//   },
// ];

// export default function OrderSummary() {
//   const { data } = useGetCartProductsQuery();
//   const [updateQuantity, { data: res }] = useUpdateCartQuantityMutation();
//   const dispatch = useDispatch();
//   const BASE_URL = process.env.BASE_URL;

//   // Handle cart items Quantity Change
//   const handleQuantityChange = async (item: any, change: number) => {
//     const res = await updateQuantity({
//       productId: item?.productId,
//       quantity: item?.quantity + change,
//       total: (item?.quantity + change) * item.productPrice,
//     });
//   };

//   useEffect(() => {
//     if (data?.data) {
//       dispatch(setCartItemId(data?.data));
//     }
//   }, [data?.data]);

//   return (
//     <Card className="mt-10">
//       <table className="w-full">
//         <thead className="bg-gray-300">
//           <tr>
//             <th className="text-start p-4 text-lg md:text-xl">Products</th>
//             <th className="text-start p-4 text-lg md:text-xl">Price</th>
//             <th className="text-start p-4 text-lg md:text-xl">Quantity</th>
//             <th className="text-start p-4 text-lg md:text-xl">Sub Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.data?.map((item, index) => {
//             const imageUrl =
//               item?.imagePath && item?.image
//                 ? // ? `${BASE_URL}?path=${item.imagePath}/&name=${encodeURIComponent(item.image)}`
//                   `${BASE_URL}?path=${item.imagePath}&name=${encodeURIComponent(item.image)}&width=${200}&height=${200}`
//                 : '/Offer2.svg';

//             return (
//               <tr key={index}>
//                 <td className="p-4">
//                   <div className="flex my-2 space-x-4">
//                     <div className="w-[112px] h-[112px] flex items-center justify-center">
//                       <img
//                         src={imageUrl}
//                         alt={item.name || 'Product Image'}
//                         className="w-full h-full object-contain"
//                       />
//                     </div>

//                     {/* <div>
//                       <img
//                         src={imageUrl}
//                         width={100}
//                         height={200}
//                         alt={item.name || 'Product Image'}
//                       />
//                     </div> */}
//                     <div>
//                       <p className="text-sm">{item.companyName || 'Seller'}</p>
//                       <p className="text-xl">{item.name}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-4 mt-3 flex space-x-2">
//                   <p className="font-semibold flex text-lg">
//                     <MdCurrencyRupee className="mt-1" />
//                     {item.productPrice}
//                   </p>
//                 </td>
//                 <td className="p-4">
//                   <div className="border border-gray-300 rounded-md w-24 p-2 flex space-x-2">
//                     <button
//                       onClick={() => handleQuantityChange(item, -1)}
//                       className="font-bold text-lg px-2"
//                     >
//                       -
//                     </button>
//                     <span className="text-center w-8">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(item, +1)}
//                       className="font-bold text-lg px-2"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </td>
//                 <td className="p-4 mt-3 flex">
//                   <MdCurrencyRupee className="mt-1" />
//                   {Number(item.total)?.toFixed(2)}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </Card>
//   );
// }
