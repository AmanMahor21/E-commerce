import React, { useEffect, useState } from 'react';
import { fetchImages } from '@/utils/hooks';
import { useRouter } from 'next/navigation';

type Props = {
  keyword: string;
  label: string;
  products: any[]; // passed in dynamically
};

const ShopByCategory: React.FC<Props> = ({ keyword, label, products }) => {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const router = useRouter();

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
    router.push(`/categories/${sub?.categorySlug}`);
  };

  return (
    <div className="w-full mx-auto px-4">
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
      <div className="flex flex-wrap justify-center lg:justify-between space-y-11 gap-3 md:space-y-0">
        {products.map((ele, index) => (
          // <div
          //   key={index}
          //   className="w-64  border rounded-md shadow-md overflow-hidden group flex flex-col relative bg-white"
          // >
          <div
            key={index}
            className={`w-64 border rounded-md shadow-md overflow-hidden group flex flex-col relative bg-white ${
              index > 2 ? 'hidden md:block' : 'flex '
            }`}
          >
            <div className="relative w-full h-52 bg-white flex items-center justify-center">
              <img
                src={imageUrls[ele.name] || '/product-fallback.png'}
                alt={ele.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white p-2 rounded-md shadow hover:bg-gray-100">🛒</button>
                <button className="bg-white p-2 rounded-md shadow hover:bg-gray-100">❤️</button>
                <button className="bg-white p-2 rounded-md shadow hover:bg-gray-100">🔁</button>
                <button className="bg-white p-2 rounded-md shadow hover:bg-gray-100">👁️</button>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-medium text-gray-800">{ele.name}</p>
              <div className="text-gray-400 text-sm mb-1">★★★★★</div>
              <p className="text-xl font-semibold text-gray-900">₹{ele.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
