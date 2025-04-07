'use client';

import Image from 'next/image';
import { categoryList } from '@/services/types';
import { useDispatch } from 'react-redux';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { MockCategoryImages } from '@/utils/MockImages';

type PageProps = {
  categories: categoryList[];
};

export default function CategoryPage({ categories }: PageProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const BASE_URL = process.env.BASE_URL;
  const internalState = useSelector((state: any) => state.internal);

  // handle top category selection
  const handleTopCategory = (category: categoryList) => {
    if (!category?.name) return;
    dispatch(setProductFilter({ keyword: category?.name }));
    if (pathname !== '/categories') router.push(`/categories/${category?.categorySlug}`);
  };

  return (
    <>
      <div className="h-80 w-[250px] bg-white rounded-xl p-6 drop-shadow-2xl border-[0.5px] border-slate-500 hidden lg:block">
        <h1 className="text-black text-[18px] font-[700] mb-6">Top Categories</h1>
        {categories.length > 0 ? (
          <ul className="list-none ml-0">
            {categories.map((category, index) => {
              const imageUrl =
                category.imagePath && category.image
                  ? `${BASE_URL}?path=${category.imagePath}/&name=${encodeURIComponent(category.image)}`
                  : '/Offer1.svg';

              return (
                <li
                  key={index}
                  className="mb-7 cursor-pointer flex h-7"
                  onClick={() => handleTopCategory(category)}
                >
                  <img src={MockCategoryImages[index]} width={30} height={30} />
                  {/* <img src={imageUrl} width={50} height={50} /> */}
                  <span className="ml-2 text-black flex justify-center items-center">
                    {category.name}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </>
  );
}
