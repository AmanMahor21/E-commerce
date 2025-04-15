import Image from 'next/image';

export default function ProductPolicy() {
  return (
    <>
      <div className="w-[30%] h-[100px] rounded  flex justify-around items-center border border-gray-300 shadow-2xl">
        <div className="flex  justify-center items-center gap-2 ">
          <div>
            <Image src="/Check_ring.svg" alt="Quality Check" width={50} height={50} />
          </div>
          <div className="text-[24px] text-black font-[600]">3 Quality Checks</div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div>
            <Image src="/NO_Return.svg" alt="NO Return " width={50} height={50} />
          </div>
          <div className="text-[24px] text-black font-[600]">No Return</div>
        </div>
      </div>
      <div className="w-[30%] h-[100px] rounded  flex justify-around items-center border border-gray-300 shadow-2xl">
        <div className="flex  justify-center items-center gap-2 ">
          <div>
            <Image src="/Location.svg" alt="Location Logog" width={30} height={30} />
          </div>
          <div className="w-[300px] flex flex-col  ml-2">
            <div className="text-[24px] text-black font-[600]">
              Delivering to - <span className="text-[#0061F2]">507303</span>
            </div>
            <div className="text-[24px] text-black overflow-hidden text-ellipsis whitespace-nowrap ">
              A/6- 302, maple Ovasis, karamsad, anand
            </div>
          </div>
        </div>
        <div className="border p-2 rounded-xl bg-orange-400 bg-opacity-40">
          <div className="text-[24px] text-black font-[600]">Changes</div>
        </div>
      </div>
    </>
  );
}
