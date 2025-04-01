import Image from 'next/image';

type ProductCardProps = {
  price: string;
  name: string;
  mainImage: string;
  bannerImage: string;
};

export default function page({
  price,
  name,
  mainImage,
  bannerImage,
}: ProductCardProps) {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="relative flex top-6 z-10 items-center justify-center left-10 -rotate-12">
        <Image
          src="/StartingStar.svg"
          alt="Star Icon"
          width={80}
          height={80}
          className="relative flex-shrink-0"
        />
        <h1 className="absolute top-4 w-[40px] text-white text-[16px] font-[900]">
          {price}
        </h1>
      </div>
      <div className="relative">
        <div className="relative w-[110px] h-[110px] rounded-full bg-[#D32F2F]"></div>
        <div className="absolute top-5 flex-shrink-0">
          <Image
            src={mainImage}
            alt={`${name} Image`}
            width={110}
            height={110}
          />
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <div className="relative bottom-3 flex-shrink-0">
          <Image
            src={bannerImage}
            alt="Banner Image"
            width={170}
            height={110}
          />
        </div>
        <h1 className="absolute bottom-4 text-[16px] font-[900]">{name}</h1>
      </div>
    </div>
  );
}
