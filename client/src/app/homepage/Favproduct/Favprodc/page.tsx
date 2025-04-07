import Image from 'next/image';

export default function page() {
  return (
    <div className="w-full max-w-[460px] min-w-[300px] h-auto md:h-[180px] shadow-lg hover:shadow-xl border border-gray-300 rounded-3xl mr-0 md:mr-10 mt-5 md:mt-10 flex flex-col md:flex-row p-4 transition-all duration-300">
      {/* Product Image - Full width on mobile, fixed on desktop */}
      <div className="w-full md:w-[150px] lg:w-[200px] flex justify-center items-center mb-3 md:mb-0">
        <Image
          src="/Favproduct.svg"
          alt="Favorite product"
          width={200}
          height={200}
          className="w-auto h-[120px] md:h-[150px] object-contain "
        />
      </div>

      {/* Product Details - Flex column that grows */}
      <div className="flex-1 flex flex-col justify-between ml-0 md:ml-4 h-full">
        {/* Store and Rating */}
        <div className="flex justify-between items-start w-full relative">
          <span className="text-black text-sm md:text-base font-semibold whitespace-nowrap">
            Andhra Pickles store
          </span>
          <div className="flex bg-orange-100 justify-center items-center px-2 py-1 gap-1 rounded-2xl">
            <Image
              src="/RatingStar.svg"
              alt="Rating Star"
              width={15}
              height={15}
              className="w-3 h-3 md:w-4 md:h-4"
            />
            <span className="text-green-700 text-xs md:text-sm font-bold">4.8(2162)</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-black text-lg md:text-xl font-extrabold mt-1">
          Chicken Pickle(250 gm)
        </h3>

        {/* Price and Discount */}
        <div className="flex items-center mt-2">
          <div className="text-black text-base md:text-lg font-bold">
            ₹329{' '}
            <span className="line-through text-gray-600 font-normal text-sm md:text-base">
              ₹749
            </span>
          </div>
          <div className="bg-red-600 text-white rounded-tl-2xl rounded-br-2xl px-2 py-1 text-xs md:text-sm font-medium ml-2">
            45% OFF
          </div>
        </div>

        {/* View More Button */}
        <button className="border-2 border-black rounded-xl px-4 py-2 w-full md:w-[160px] h-[40px] flex justify-center items-center text-black text-sm md:text-base font-bold tracking-wide mt-3 hover:bg-black hover:text-white transition-colors duration-200">
          View More
        </button>
      </div>
    </div>
  );
}
