const SpecificCategorySkelton = () => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-between space-y-11 gap-3 md:space-y-0 w-full mx-auto px-4 md:px-16 my-9">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`w-full md:w-80 xl:w-64 border rounded-md shadow-md overflow-hidden flex flex-col relative bg-white ${
              index > 2 ? 'hidden md:block' : 'flex'
            } animate-pulse`}
          >
            <div className="relative w-full h-52 bg-gray-200"></div>

            <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-gray-300"></div>

            <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-100">
              <div className=" p-2 rounded-md shadow w-8 h-8 bg-gray-200"></div>
              <div className=" p-2 rounded-md shadow w-8 h-8 bg-gray-200"></div>
              <div className=" p-2 rounded-md shadow w-8 h-8 bg-gray-200"></div>
            </div>

            <div className="p-4 text-center space-y-2">
              <div className="h-5 w-3/4 bg-gray-300 mx-auto rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 mx-auto rounded"></div>
              <div className="flex justify-center items-end gap-2">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SpecificCategorySkelton;
