// CategoryList.jsx
'use client';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '@/services/api';
import { useRouter } from 'next/navigation';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CategoryLoader from './CategoryLoader';

const MegaCategory = () => {
  const [expanded, setExpanded] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [nestedCategoryId, setNestedCategoryId] = useState('');

  const { data: subCategoryResponse, isFetching: isSubFetching } = useGetSubCategoriesQuery(
    expanded,
    {
      skip: !expanded,
    },
  );
  const { data: nestedSubCategoryResponse, isFetching: isNestedFetching } =
    useGetSubCategoriesQuery(nestedCategoryId, { skip: !nestedCategoryId });

  const filters = useSelector((state: any) => state.product);

  const { data, isLoading: isParentFetching } = useGetCategoriesQuery({ limit: 7 });
  const router = useRouter();
  const dispatch = useDispatch();

  // Handle open and close parent category
  const handleToggle = (parent: any) => {
    setCategoryId(parent?.categoryId);
    setExpanded(expanded == parent?.categoryId ? null : parent?.categoryId);
  };

  // Handle to redirect category page to show all product
  const handleSubCategory = (sub: any) => {
    dispatch(setProductFilter({ ...filters, keyword: sub?.name }));
    router.push(`/categories/${sub?.name}`);
  };

  // Handle to show rest or end categories on clikc of right arrow
  const handleRightArrow = (e: any, id: any) => {
    e.stopPropagation();
    setNestedCategoryId((prev) => (prev === id ? '' : id));
    setNestedCategoryId(id);
  };

  // close the sub-category on outside click
  useEffect(() => {
    const close = (e: any) => {
      if (!e.target.closest('.dropdown-wrapper')) setExpanded('');
    };

    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);
  return (
    <div className="w-full h-fit justify-center absolute top-0 flex flex-wrap gap-4 p-4 bg-white shadow dropdown-wrapper">
      {isParentFetching ? (
        <CategoryLoader />
      ) : (
        data?.data.map((parent: any, ind: number) => (
          <div key={ind} className={`relative ${ind > 3 ? 'hidden lg:block' : ''}`}>
            <button
              onClick={() => handleToggle(parent)}
              className="flex items-center gap-1 text-sm font-medium text-gray-800 py-2 px-4 hover:bg-gray-100 rounded transition"
            >
              <span>{parent.name}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  expanded === parent.categoryId ? 'rotate-180 text-orange-500' : ''
                }`}
              />
            </button>

            {expanded === parent.categoryId && (
              <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                {isSubFetching ? (
                  <li className="text-gray-500 text-sm p-2">Loading...</li>
                ) : (
                  subCategoryResponse?.data?.map((sub: any, ind: number) => (
                    <li key={ind} className="relative group" onClick={() => handleSubCategory(sub)}>
                      <div className="overflow-hidden">
                        <div className="text-sm text-gray-700 flex justify-between items-center hover:scale-105 transform transition-transform hover:text-orange-500 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          {sub.name}
                          <div className="h-full">
                            <ChevronRight
                              size={16}
                              className={`transition-transform duration-300 ${
                                nestedCategoryId === sub.categoryId
                                  ? 'rotate-180 text-orange-500'
                                  : ''
                              }`}
                              onClick={(e) => handleRightArrow(e, sub.categoryId)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Nested Subcategory */}
                      {nestedCategoryId === sub.categoryId && (
                        <ul className="absolute top-0 left-full ml-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
                          {isNestedFetching ? (
                            <li className="text-gray-400 text-sm p-2">Loading...</li>
                          ) : (
                            nestedSubCategoryResponse?.data?.map((nested: any, index: number) => (
                              <li
                                key={index}
                                className="text-sm text-gray-700 hover:text-orange-500 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSubCategory(sub)}
                              >
                                {nested.name}
                              </li>
                            ))
                          )}
                        </ul>
                      )}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MegaCategory;
