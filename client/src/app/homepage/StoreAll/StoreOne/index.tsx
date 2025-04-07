import Image from 'next/image';
import { VendorList } from '@/services/types'; // Adjust path to where VendorList is defined

interface OneStoreProps {
  vendor: VendorList;
}

export default function OneStore({ vendor }: OneStoreProps) {
  // Destructure properties from vendor as needed
  const { companyName, productImages, startingFrom } = vendor;

  return (
    <div>
      <div className="w-[460px] h-[350px]  rounded-xl shadow-2xl border-[0.5px] border-gray-400 mr-10  mt-20">
        <div>
          <Image
            src="/Store.svg"
            alt="Store Image"
            width={460}
            height={460}
            className="flex-shrink-0 rounded-t-xl  "
          />
        </div>
        <div className=" h-auto p-4 flex flex-col justify-between  w-full items-stretch">
          <div className="flex justify-between items-start">
            <div className="text-black text-[18px] font-[600]">{companyName}</div>
            <div className="bg-[#494949] w-[60px] rounded-2xl h-auto flex justify-evenly items-center p-1">
              <Image src="/RatingStarYello.svg" alt=" Rating Star logo" width={15} height={15} />
              <h1>4.9</h1>
            </div>
          </div>
          <div className="flex justify-between items-center w-2/3 mt-3">
            <div className="flex gap-2 ">
              <Image src="/StorePrice.svg" alt=" staring price logo" width={15} height={15} />
              <h1 className="text-[#808080] text-[12px] font-[500]">starts from ${startingFrom}</h1>
            </div>
            <div className="flex gap-2">
              <Image
                src="/StoreBestSeller.svg"
                alt=" Store Best Seller logo"
                width={15}
                height={15}
              />
              <h1 className="text-[#808080] text-[12px] font-[500]">starts from $299</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
