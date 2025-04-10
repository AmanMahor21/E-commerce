// CategoryList.jsx
'use client';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '@/services/api';
import { useRouter } from 'next/navigation';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CategoryList = () => {
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

  const { data } = useGetCategoriesQuery({ limit: 6 });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleToggle = (parent: any) => {
    setCategoryId(parent?.categoryId);
    setExpanded(expanded == parent?.categoryId ? null : parent?.categoryId);
  };
  const handleSubCategory = (sub: any) => {
    dispatch(setProductFilter({ ...filters, keyword: sub?.name }));

    router.push(`/categories/${sub?.categorySlug}`);
    // setExpanded(expanded == parent?.categoryId ? null : parent?.categoryId);
  };

  const handleRightArrow = (e: any, id: any) => {
    e.stopPropagation();
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
    <div className="w-full h-fit justify-center flex flex-wrap gap-4 p-4 bg-white/30 shadow dropdown-wrapper">
      {data?.data.map((parent: any, ind: number) => (
        <div key={ind} className="relative">
          <button
            onClick={() => handleToggle(parent)}
            className="flex items-center gap-1 text-sm font-medium text-gray-800 py-2 px-4 hover:bg-gray-100 rounded transition"
          >
            <span>{parent.name}</span>
            {expanded === parent.categoryId ? (
              <ChevronDown size={16} className="transition-transform rotate-180 text-orange-500" />
            ) : (
              <ChevronDown size={16} className="transition-transform" />
            )}
          </button>

          {expanded === parent.categoryId && (
            <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
              {isSubFetching ? (
                <li className="text-gray-500 text-sm p-2">Loading...</li>
              ) : (
                subCategoryResponse?.data?.map((sub: any, ind: number) => (
                  <li
                    key={ind}
                    className="relative group"
                    onClick={() => handleSubCategory(sub)}
                    // onClick={() => setNestedCategoryId(sub.categoryId)}
                  >
                    {/* Wrapper to allow hover scale without overflow issues */}
                    <div className="overflow-hidden">
                      <div className="text-sm text-gray-700 flex justify-between items-center hover:scale-105 transform transition-transform hover:text-orange-500 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {sub.name}
                        <div className=" h-full">
                          {categoryId === parent.categoryId ? (
                            <ChevronRight
                              size={16}
                              className="transition-transform text-gray-700 hover:text-orange-500"
                              onClick={(e) => handleRightArrow(e, sub.categoryId)}
                              // onClick={() => setNestedCategoryId(parent.categoryId)}
                            />
                          ) : (
                            <ChevronRight
                              size={16}
                              // onClick={(e) => handleRightArrow(e, parent.categoryId)}
                              //   className="transition-transform rotate-180 text-orange-500"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Nested subcategory dropdown */}
                    {nestedCategoryId === sub.categoryId && (
                      <ul className="absolute top-0 left-full ml-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
                        {isNestedFetching ? (
                          <li className="text-gray-400 text-sm p-2">Loading...</li>
                        ) : (
                          nestedSubCategoryResponse?.data?.map((nested: any, index: number) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 hover:text-orange-500 px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
      ))}
    </div>
  );
};

export default CategoryList;

// // CategoryList.jsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { ChevronDown, ChevronRight } from 'lucide-react';
// import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '@/services/api';
// import { useRouter } from 'next/navigation';
// import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
// import { useDispatch } from 'react-redux';

// const CategoryList = () => {
//   const [expanded, setExpanded] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [nestedCategoryId, setNestedCategoryId] = useState('');

//   const { data: subCategoryResponse, isFetching: isSubFetching } = useGetSubCategoriesQuery(
//     expanded,
//     {
//       skip: !expanded,
//     },
//   );
//   const { data: nestedSubCategoryResponse, isFetching: isNestedFetching } =
//     useGetSubCategoriesQuery(nestedCategoryId, { skip: !nestedCategoryId });

//   const { data } = useGetCategoriesQuery({ limit: 6 });
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleToggle = (parent: any) => {
//     console.log(parent, 'xxxxxxxxx');
//     setCategoryId(parent?.categoryId);
//     setExpanded(expanded == parent?.categoryId ? null : parent?.categoryId);
//   };
//   const handleSubCategory = (sub: any) => {
//     console.log(sub, 'asd  xxxxxxxxx');
//     dispatch(setProductFilter({ keyword: parent?.name }));

//     // router.push(`/categories/${sub?.categorySlug}`);
//     // setExpanded(expanded == parent?.categoryId ? null : parent?.categoryId);
//   };

//   const handleRightArrow = (e: any, id: any) => {
//     e.stopPropagation();
//     console.log(id, 'lllllllllll');
//     setNestedCategoryId(id);
//   };
//   // close the sub-category on outside click
//   useEffect(() => {
//     const close = (e: any) => {
//       if (!e.target.closest('.dropdown-wrapper')) setExpanded('');
//     };

//     document.addEventListener('click', close);
//     return () => document.removeEventListener('click', close);
//   }, []);

//   console.log(expanded, 'nnn');

//   return (
//     <div className="w-full h-fit justify-center flex flex-wrap gap-4 p-4 bg-white/30 shadow dropdown-wrapper">
//       {data?.data.map((parent: any, ind: number) => (
//         <div key={ind} className="relative">
//           <button
//             onClick={() => handleToggle(parent)}
//             className="flex items-center gap-1 text-sm font-medium text-gray-800 py-2 px-4 hover:bg-gray-100 rounded transition"
//           >
//             <span>{parent.name}</span>
//             {expanded === parent.categoryId ? (
//               <ChevronDown size={16} className="transition-transform rotate-180 text-orange-500" />
//             ) : (
//               <ChevronDown size={16} className="transition-transform" />
//             )}
//           </button>

//           {expanded === parent.categoryId && (
//             <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
//               {isSubFetching ? (
//                 <li className="text-gray-500 text-sm p-2">Loading...</li>
//               ) : (
//                 subCategoryResponse?.data?.map((sub: any, ind: number) => (
//                   <li
//                     key={ind}
//                     className="relative group"
//                     onClick={() => handleSubCategory(sub)}
//                     // onClick={() => setNestedCategoryId(sub.categoryId)}
//                   >
//                     {/* Wrapper to allow hover scale without overflow issues */}
//                     <div className="overflow-hidden">
//                       <div className="text-sm text-gray-700 flex justify-between items-center hover:scale-105 transform transition-transform hover:text-orange-500 px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                         {sub.name}
//                         {categoryId === parent.categoryId ? (
//                           <ChevronRight
//                             size={16}
//                             className="transition-transform"
//                             onClick={(e) => handleRightArrow(e, parent.categoryId)}
//                             // onClick={() => setNestedCategoryId(parent.categoryId)}
//                           />
//                         ) : (
//                           <ChevronRight
//                             size={16}
//                             onClick={(e) => handleRightArrow(e, parent.categoryId)}
//                             className="transition-transform rotate-180 text-orange-500"
//                           />
//                         )}
//                       </div>
//                     </div>

//                     {/* Nested subcategory dropdown */}
//                     {nestedCategoryId === sub.categoryId && (
//                       <ul className="absolute top-0 left-full ml-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
//                         {isNestedFetching ? (
//                           <li className="text-gray-400 text-sm p-2">Loading...</li>
//                         ) : (
//                           nestedSubCategoryResponse?.data?.map((nested: any, index: number) => (
//                             <li
//                               key={index}
//                               className="text-sm text-gray-700 hover:text-orange-500 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                             >
//                               {nested.name}
//                             </li>
//                           ))
//                         )}
//                       </ul>
//                     )}
//                   </li>
//                 ))
//               )}
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryList;
