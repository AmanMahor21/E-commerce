'use client';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '@/services/api';
import { useRouter } from 'next/navigation';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CategoryLoader from './CategoryLoader';
import { CategoryTree } from './CategoryUnit/CategoryTree';
import { Button, Offcanvas } from 'react-bootstrap';
import { RiMenuFold2Line } from 'react-icons/ri';

const MegaCategory = () => {
  const [expanded, setExpanded] = useState('');
  const [canvasExpanded, setCanvasExpanded] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [nestedCategoryId, setNestedCategoryId] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);

  const { data: subCategoryResponse, isFetching: isSubFetching } = useGetSubCategoriesQuery(
    showCanvas ? canvasExpanded : expanded,
    {
      skip: !(showCanvas ? canvasExpanded : expanded),
    },
  );

  const { data: nestedSubCategoryResponse, isFetching: isNestedFetching } =
    useGetSubCategoriesQuery(nestedCategoryId, { skip: !nestedCategoryId });

  const filters = useSelector((state: any) => state.product);
  const { data, isLoading: isParentFetching } = useGetCategoriesQuery({ limit: 7 });
  const router = useRouter();
  const dispatch = useDispatch();

  // Handle open and close parent category for desktop
  const handleToggle = (parent: any) => {
    setCategoryId(parent?.categoryId);
    setExpanded(Number(expanded) == Number(parent?.categoryId) ? null : parent?.categoryId);
  };

  // Handle open and close parent category for canvas
  const handleCanvasToggle = (parent: any) => {
    setCategoryId(parent?.categoryId);
    setCanvasExpanded(
      Number(canvasExpanded) == Number(parent?.categoryId) ? null : parent?.categoryId,
    );
  };

  // Handle to redirect category page to show all product
  const handleSubCategory = (sub: any) => {
    dispatch(setProductFilter({ ...filters, keyword: sub?.name }));
    router.push(`/categories/${sub?.name}`);
    setShowCanvas(false);
  };

  // Handle to show rest or end categories on click of right arrow
  const handleRightArrow = (e: any, id: any) => {
    e.preventDefault();
    e.stopPropagation();
    setNestedCategoryId((prev) => (prev === id ? '' : id));
  };

  // Reset states when canvas closes
  const handleCanvasClose = () => {
    setShowCanvas(false);
    setCanvasExpanded('');
    setNestedCategoryId('');
  };

  return (
    <>
      {/* Desktop View */}
      <div className="w-full h-fit justify-center flex-wrap gap-4 p-4 shadow hidden lg:flex">
        {/* <div className="w-full h-fit justify-center absolute top-0 flex-wrap gap-4 p-4 shadow hidden lg:flex"> */}
        {/* <div className="w-full h-fit justify-center absolute top-0 flex-wrap gap-4 p-4 shadow dropdown-wrapper hidden lg:flex"> */}
        {isParentFetching ? (
          <CategoryLoader />
        ) : (
          <CategoryTree
            data={data?.data}
            setExpanded={setExpanded}
            setNestedCategoryId={setNestedCategoryId}
            expanded={expanded}
            nestedCategoryId={nestedCategoryId}
            isSubFetching={isSubFetching}
            isNestedFetching={isNestedFetching}
            subCategoryResponse={subCategoryResponse}
            nestedSubCategoryResponse={nestedSubCategoryResponse}
            handleToggle={handleToggle}
            handleRightArrow={handleRightArrow}
            handleSubCategory={handleSubCategory}
            showCanvas={showCanvas}
          />
        )}
      </div>

      {/* Mobile Offcanvas View */}
      <div className="lg:hidden px-4 py-3">
        <RiMenuFold2Line
          className="text-2xl cursor-pointer text-black"
          onClick={() => setShowCanvas(true)}
        />
      </div>
      <Offcanvas
        show={showCanvas}
        onHide={handleCanvasClose}
        placement="start"
        className=" bg-slate-800 text-white w-3/4 md:w-1/2 overflow-y-hidden"
      >
        <Offcanvas.Header closeButton className="border-b border-slate-700">
          <Offcanvas.Title className="text-white">Categories</Offcanvas.Title>
          <button
            onClick={handleCanvasClose}
            className="text-white hover:text-orange-400 transition"
          >
            x
          </button>
        </Offcanvas.Header>

        <Offcanvas.Body
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-800 custom-scrollbar"
        >
          <div className="relative z-50">
            {isParentFetching ? (
              <CategoryLoader />
            ) : (
              <CategoryTree
                data={data?.data}
                setExpanded={setExpanded}
                setNestedCategoryId={setNestedCategoryId}
                expanded={canvasExpanded}
                nestedCategoryId={nestedCategoryId}
                isSubFetching={isSubFetching}
                isNestedFetching={isNestedFetching}
                subCategoryResponse={subCategoryResponse}
                nestedSubCategoryResponse={nestedSubCategoryResponse}
                handleToggle={handleCanvasToggle}
                handleRightArrow={handleRightArrow}
                handleSubCategory={handleSubCategory}
                showCanvas={showCanvas}
              />
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MegaCategory;
