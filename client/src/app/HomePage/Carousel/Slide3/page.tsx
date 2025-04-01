import Image from 'next/image';

export default function Page() {
  return (
    <div className="md:min-w-[50%] lg:min-w-[33.33%] min-w-full p-4 flex justify-center items-center">
      <div className="w-full h-[140px] bg-gradient-to-b to-[#994C1E] from-[#FF7F32] flex flex-col justify-around items-start rounded-lg p-4 relative">
        <div className="w-[220px] text-[20px] font-[800] text-black">
          Enjoy flat 20% OFF at Sitara Foods
        </div>
        <div className="w-[120px] h-[20px] p-4 font-[700] text-[15px] text-white bg-black flex justify-center items-center rounded-lg">
          View Store
        </div>
        <Image
          src="/Offer3.svg"
          alt="Offer3 logo"
          width={100}
          height={100}
          className="absolute bottom-2 right-4"
        />
      </div>
    </div>
  );
}
