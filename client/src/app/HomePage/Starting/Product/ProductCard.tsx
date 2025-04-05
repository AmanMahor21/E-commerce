import Image from 'next/image';

type ProductCardProps = {
  price: string;
  name: string;
  mainImage: string;
  bannerImage: string;
};

export const ProductCard = ({ price, name, mainImage, bannerImage }: ProductCardProps) => {
  return (
    <div className="flex  flex-col justify-center items-center relative ">
      {/* Star Icon with Price */}
      <div className="relative flex top-6 z-10 items-center justify-center left-0 sm:left-5 md:left-10 -rotate-12">
        <Image
          src="/StartingStar.svg"
          alt="Star Icon"
          width={80}
          height={80}
          className="relative flex-shrink-0 w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] h-auto"
        />
        <h1 className="absolute top-2 sm:top-4 w-[30px] sm:w-[40px] text-white text-[12px] sm:text-[14px] md:text-[16px] font-[900]">
          {price}
        </h1>
      </div>

      {/* Main Image with Background */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-[90px] sm:w-[100px] md:w-[110px] h-[90px] sm:h-[100px] md:h-[110px] rounded-full bg-[#D32F2F]"></div>
        <div className="absolute top-4 sm:top-5">
          <Image
            src={mainImage}
            alt={`${name} Image`}
            width={100}
            height={100}
            className="w-[80px] sm:w-[90px] md:w-[100px] h-auto flex-shrink-0"
          />
        </div>
      </div>

      {/* Banner Image & Name */}
      <div className="relative flex justify-center items-center">
        <div className="relative bottom-2 sm:bottom-3 flex-shrink-0">
          <Image
            src={bannerImage}
            alt="Banner Image"
            width={170}
            height={110}
            className="w-[120px] sm:w-[150px] md:w-[170px] h-auto"
          />
        </div>
        <h1 className="absolute bottom-3 sm:bottom-4 text-[12px] sm:text-[16px] md:text-[18px] font-bold">
          {name}
        </h1>
      </div>
    </div>
  );
};
