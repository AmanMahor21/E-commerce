'use client';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export const CategoryTree = ({
  data,
  expanded,
  setNestedCategoryId,
  setExpanded,
  nestedCategoryId,
  isSubFetching,
  isNestedFetching,
  subCategoryResponse,
  nestedSubCategoryResponse,
  handleToggle,
  handleRightArrow,
  handleSubCategory,
  showCanvas,
}: any) => {
  useEffect(() => {
    const close = (e: any) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        setExpanded('');
        setNestedCategoryId('');
      }
    };

    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [expanded]);

  return (
    <>
      {data?.map((parent: any, ind: number) => (
        <div key={ind} className="relative  flex ">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle(parent);
            }}
            className={`flex items-center gap-1 text-sm font-medium   text-white lg:text-black py-2 px-4  hover:bg-slate-700 lg:hover:bg-inherit rounded transition ${!showCanvas && ind > 3 ? 'hidden xl:flex' : ''}`}
          >
            <span className="">{parent.name}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                expanded === parent.categoryId ? 'rotate-180 text-orange-400' : 'text-slate-300'
              }`}
            />
          </button>

          {Number(expanded) == Number(parent.categoryId) && (
            <ul className=" ml-4 space-y-1 border-l-2 border-slate-600 z-10 bg-slate-700 rounded-md lg:absolute lg:top-12 lg:min-w-[200px] lg:ml-0 lg:pl-0 lg:border-none dropdown-wrapper lg:bg-slate-700 lg:border lg:border-slate-600 lg:rounded lg:shadow-lg">
              {isSubFetching ? (
                <li className="text-slate-400 text-sm p-2">Loading...</li>
              ) : (
                subCategoryResponse?.data?.map((sub: any, i: number) => (
                  <li
                    key={i}
                    className="relative group z-10"
                    onClick={() => handleSubCategory(sub)}
                  >
                    <div className="text-sm text-slate-200 flex  justify-between items-center px-4 py-2 transition-transform duration-300 transform  hover:text-orange-400 hover:bg-slate-600 cursor-pointer rounded z-10">
                      {sub.name}
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          nestedCategoryId === sub.categoryId
                            ? 'rotate-180 text-orange-400 '
                            : 'hover:text-orange-500'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRightArrow(e, sub.categoryId);
                        }}
                      />
                    </div>

                    {nestedCategoryId === sub.categoryId && (
                      <ul
                        className="ml-8 border-l-2 border-slate-500 pl-3 bg-slate-600 rounded-md
      lg:absolute lg:top-0 lg:left-full lg:ml-1 lg:w-48 space-y-1
      lg:bg-slate-700 lg:border lg:border-slate-600
      lg:rounded lg:shadow-lg lg:z-50 lg:pointer-events-auto"
                      >
                        {isNestedFetching ? (
                          <li className="text-slate-400 text-sm p-2">Loading...</li>
                        ) : (
                          nestedSubCategoryResponse?.data?.map((nested: any, j: number) => (
                            <li
                              key={j}
                              className="text-sm text-slate-200 hover:text-orange-400 px-4 py-2 hover:bg-slate-500 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubCategory(nested);
                              }}
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
    </>
  );
};
