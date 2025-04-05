import Image from 'next/image';

export default function Page() {
  return (
    <div className="md:min-w-[50%] lg:min-w-[33.33%] min-w-full p-4 flex justify-center items-center">
      <div className="flex flex-row flex-wrap justify-start items-start rounded-lg p-4 relative bg-gradient-to-b to-[#994C1E] from-[#FF7F32]">
        <div className="w-[220px] text-[20px] items-start  justify-start flex font-[800] text-black pb-2">
          Enjoy flat 20% OFF at Sitara Foods
        </div>
        <div className="flex items-end basis-1/2 h-full mt-auto ">
          <div className="h-fit p-2 font-[700] text-[14px] text-white bg-black  rounded-lg">
            View Store
          </div>
        </div>
        <div className=" basis-1/2 flex justify-end">
          <Image
            src="/Offer3.svg"
            alt="Offer3 logo"
            width={50}
            height={50}
            // className="absolute bottom-2 right-4"
            className="  lg:block "
          />
        </div>
      </div>
    </div>
  );
}
