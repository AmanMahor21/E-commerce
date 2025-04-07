import Image from 'next/image';

export default function page() {
  return (
    <div>
      <div className="w-auto  h-auto max-w-[220px]   mt-10 mr-6 p-4 flex flex-col justify-center items-center">
        <Image
          src="/ProductCategory.svg"
          alt="ProductCategory Image"
          width={200}
          height={200}
          className="flex-shrink-0 rounded-t-xl  "
        />

        <div className="text-black text-[24px] font-[600] text-center ">
          mango pickle
        </div>
      </div>
    </div>
  );
}
