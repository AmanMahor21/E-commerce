import React, { useEffect, useState } from 'react';
import { fetchImages, useProductActions } from '@/utils/hooks';
import { useRouter } from 'next/navigation';
import { FaExchangeAlt, FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import SpecificCategorySkelton from './SpecificCategorySkelton';

type Props = {
  keyword: string;
  label: string;
  products: any[]; // passed in dynamically
  loading: boolean;
};

const ShopByCategory: React.FC<Props> = ({ keyword, label, products, loading }) => {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const { handleAddToCart, handleSave } = useProductActions();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const loadImages = async () => {
      const urls: Record<string, string> = {};
      for (const ele of products) {
        const url = await fetchImages(keyword);
        if (url) urls[ele.name] = url;
      }
      setImageUrls(urls);
    };

    if (products.length > 0) {
      loadImages();
    }
  }, [products]);

  const handleSubCategory = (sub: any) => {
    dispatch(setProductFilter({ keyword: sub?.name }));
    router.push(`/categories/${sub?.name}`);
  };
  const handleProductDetail = (sub: any) => {
    router.push(`/product/${sub.productSlug}/${encodeURIComponent(sub?.productId)}`);
  };

  return loading ? (
    <SpecificCategorySkelton />
  ) : (
    <>
      <div className="w-full mx-auto px-4 md:px-16 my-9">
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-xl font-bold">{label}</h3>
          <p className="text-sm border border-gray-300 hidden lg:block px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition duration-300 ease-in-out">
            View more
          </p>
          <p className="text-sm border border-gray-300 lg:hidden px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition duration-300 ease-in-out">
            More
          </p>
        </div>

        {/* FLEX WRAP GRID STYLE */}
        <div className="flex flex-wrap justify-center 2xl:justify-between space-y-11 gap-3 md:space-y-0">
          {/* <div className="flex flex-wrap justify-center lg:justify-between space-y-11 gap-3 md:space-y-0"> */}
          {products.map((ele, index) => {
            const originalPrice = Number(ele?.price) || 0;
            const discountAmount = Math.min(75, originalPrice);
            const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

            return (
              <div
                key={index}
                className={`w-full md:w-80 xl:w-64 cursor-pointer group border rounded-md shadow-md overflow-hidden flex flex-col relative bg-white ${
                  index > 2 ? 'hidden md:block' : 'flex'
                }`}
                onClick={() => handleProductDetail(ele)}
              >
                <div className="relative w-full h-52 bg-white flex items-center justify-center">
                  <p className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {`-${discountPercentage}%`}
                  </p>
                  <img
                    src={imageUrls[ele.name] || '/product-fallback.png'}
                    alt={ele.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-2 rounded-md shadow ">
                      <FaShoppingCart
                        className=" hover:text-yellow-500 w-5 h-5"
                        onClick={(e) => handleAddToCart(ele, e)}
                      />
                    </button>
                    <button className="bg-white p-2 rounded-md shadow">
                      <FaHeart
                        className=" hover:text-red-500 w-5 h-5"
                        onClick={(e) => handleSave(ele, e)}
                      />
                    </button>
                    <button className="bg-white p-2 rounded-md shadow ">
                      <FaEye className=" hover:text-blue-500 w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-lg font-medium text-gray-800">{ele.name}</p>
                  <div className="text-gray-400 text-sm mb-1">★★★★★</div>
                  <div className="flex justify-center items-end gap-2">
                    <p className="text-xl font-semibold text-gray-900">
                      ₹ ₹{Math.max(originalPrice - 75, 0)}
                    </p>
                    <p className=" text-gray-400 line-through">₹{ele.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
