import Image from 'next/image';

export default function Page() {
  return (
    <div className="md:min-w-[50%] lg:min-w-[33.33%] min-w-full p-4 flex justify-center items-center">
      <div className="w-full h-[140px]  bg-gradient-to-b to-[#0061F2E3] from-[#0043A8FC] flex flex-col justify-around items-start rounded-lg p-4 relative">
        <div className="w-[220px] text-[20px] font-[800] text-black">
          Enjoy flat 100 OFF at Andhra Pickles
        </div>
        <div className="w-[120px] h-[20px] p-4 font-[700] text-[15px] text-black bg-white flex justify-center items-center rounded-lg">
          View Store
        </div>
        <Image
          src="/Offer2.svg"
          alt="Offer2 logo"
          width={100}
          height={100}
          className="absolute bottom-0 right-5"
        />
      </div>
    </div>
  );
}
