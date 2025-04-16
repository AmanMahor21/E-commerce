export const ProductCardSkeleton = () => {
  return (
    <div className="pb-7 w-full">
      <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8 p-4 lg:p-8 shadow-lg rounded-lg bg-white w-full max-w-6xl mx-auto animate-pulse min-h-[270px]">
        {/* Image Skeleton */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex justify-center items-center">
          <div className="w-full h-40 bg-gray-200 rounded-lg" />
        </div>

        {/* Details Skeleton */}
        <div className="flex-1 flex flex-col justify-between w-full lg:w-[60%] space-y-4">
          <div className="space-y-2">
            <div className="w-1/2 h-4 bg-gray-200 rounded" />
            <div className="w-3/4 h-6 bg-gray-300 rounded" />
            <div className="flex gap-4 mt-2">
              <div className="w-24 h-5 bg-gray-200 rounded" />
              <div className="w-16 h-5 bg-gray-200 rounded" />
              <div className="w-20 h-6 bg-red-200 rounded-full" />
            </div>
          </div>
          <div className="w-full sm:w-64 lg:w-72 h-12 bg-gray-300 rounded-lg" />
        </div>

        {/* Rating & Heart */}
        <div className="flex flex-row items-end justify-end lg:justify-between w-full lg:w-auto space-x-4 lg:space-y-4 lg:h-auto">
          <div className="w-16 h-6 bg-orange-200 rounded-full" />
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
