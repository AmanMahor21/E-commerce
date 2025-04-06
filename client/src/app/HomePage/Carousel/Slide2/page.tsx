import Image from 'next/image';

export default function Page() {
  return (
    <div className="lg:min-w-[33.33%] min-w-full p-4 flex justify-center items-center">
      <div className="flex flex-row flex-wrap justify-start items-start rounded-lg p-4 relative  bg-gradient-to-b to-[#0061F2E3] from-[#0043A8FC]">
        <div className="w-[220px] text-[20px] items-start  justify-start flex font-[800] text-black">
          Enjoy flat 100 OFF at Andhra Pickles
        </div>
        <div className="flex items-end basis-1/2 h-full mt-auto ">
          <div className="h-fit p-2 font-[700] text-[14px] text-white bg-black  rounded-lg">
            View Store
          </div>
        </div>
        <div className="basis-1/2 flex justify-end">
          <Image
            src="/Offer2.svg"
            alt="Offer2 logo"
            width={50}
            height={50}
            className="  lg:block "

            // className="absolute bottom-0 right-5"
          />
        </div>
      </div>
    </div>
  );
}
