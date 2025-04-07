// Import the necessary hook and types
'use client';
import { useGetVendorListQuery } from '@/services/api';
import OneStore from './StoreOne'; // Assuming OneStore is in this location

export default function Page() {
  // Use the RTK Query hook to fetch the vendor list
  const { data: vendorList, error, isLoading } = useGetVendorListQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !vendorList) {
    return <div>Error occurred while fetching vendor data.</div>;
  }

  return (
    <div className="w-full h-full justify-center flex flex-col items-center lg:items-start">
      <div className="flex justify-between items-center w-full lg:w-11/12 pl-24 lg:pr-0 pr-24">
        <div className="text-[36px] font-[700] text-black">Stores</div>
        <div className="text-[36px] font-[700] text-[#0061F2]">View All</div>
      </div>
      <div className="flex flex-wrap justify-start items-center pr-24 pl-24">
        {/* Map over the fetched vendor list and render a OneStore component for each vendor */}
        {vendorList?.map((vendor) => <OneStore key={vendor.vendorId} vendor={vendor} />)}
      </div>
    </div>
  );
}
