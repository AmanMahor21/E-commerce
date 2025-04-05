'use client';
import { resetProductInput } from '@/reduxStore/internalSlice';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useGetCategoriesQuery, useLazyGetFilterProductsQuery } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface SidebarItem {
  id: number;
  name: string;
}

interface SidebarProps {
  setActiveName: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveName }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const { data: categories } = useGetCategoriesQuery();
  const [fetchProducts, { data }] = useLazyGetFilterProductsQuery();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { category } = useParams();

  const filters = useSelector((state: any) => state.product);
  const internalState = useSelector((state: any) => state.internal);

  // dynamically highliting category using params
  useEffect(() => {
    if (category) {
      const foundCategory = categories?.data?.find((ele: any) => ele.categorySlug == category);
      if (foundCategory) {
        setActiveItem(foundCategory.categoryId);
        setActiveName(foundCategory.name);
      }
    }
  }, [category]);

  // Handle category selection and dynamic redirection
  const handleItemClick = (id: number, name: string, slug: string) => {
    setActiveItem(id);
    setActiveName(name);
    dispatch(setProductFilter({ ...filters, keyword: name }));
    if (id) dispatch(resetProductInput(true));
    if (pathname !== `/categories/${slug}`) {
      router.push(`/categories/${slug}`);
    }
  };

  // Clear active category when a product is searched by keyword
  useEffect(() => {
    if (!internalState?.isCategoryActive) {
      setActiveItem(null);
    }
  }, [!internalState?.isCategoryActive]);

  return (
    // <div className="pr-[18px] pl-12 hidden lg:block fixed top-0 left-0 h-screen overflow-y-auto">
    <div className="pr-[18px] pl-12 hidden lg:block fixed h-screen">
      {/* <div className="w-[304px] flex flex-col"> */}
      <div className="w-[304px] h-[65px] flex flex-col">
        <ul>
          {categories?.data?.map((item) => (
            <li
              key={item.categoryId}
              className={`relative pl-[54px] py-[14.5px] flex items-center gap-[6px] ${
                activeItem === item.categoryId
                  ? 'bg-[#FF7F324D]' // Active background
                  : 'hover:bg-[#FF7F324D] border-[1px] border-[#00000099]' // Border on hover if not active
              }`}
              onClick={() => handleItemClick(item.categoryId, item.name, item.categorySlug)}
            >
              {/* Active indicator */}
              {activeItem === item.categoryId && (
                <div className="absolute left-0 top-0 bg-[#FF7F32] w-[13px] h-[64px]" />
              )}
              <img src="/iconoir_vegan-circle.svg" alt="leaf" className="w-[36px] h-[36px]" />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
