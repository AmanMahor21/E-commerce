// import Image from 'next/image';

// export default function ProductPolicy() {
//   return (
//     <div className="flex flex-col lg:flex-row items-center gap-4 px-4">
//       {/* First Policy Row */}
//       <div className="w-full max-w-lg h-auto rounded-lg flex flex-wrap justify-between items-center border border-gray-300 shadow-md p-4 md:flex-nowrap md:h-[100px]">
//         {/* Quality Check */}
//         <div className="flex items-center gap-2">
//           <Image src="/Check_ring.svg" alt="Quality Check" width={40} height={40} />
//           <div className="text-sm md:text-lg lg:text-xl text-black font-semibold">
//             3 Quality Checks
//           </div>
//         </div>
//         {/* No Return */}
//         <div className="flex items-center gap-2">
//           <Image src="/NO_Return.svg" alt="No Return" width={40} height={40} />
//           <div className="text-sm md:text-lg lg:text-xl text-black font-semibold">No Return</div>
//         </div>
//       </div>

//       {/* Second Policy Row */}
//       <div className="w-full max-w-lg h-auto rounded-lg flex flex-wrap justify-between items-center border border-gray-300 shadow-md p-4">
//         {/* Location */}
//         <div className="flex items-center gap-2 w-3/4">
//           <Image src="/Location.svg" alt="Location Logo" width={30} height={30} />
//           <div className="flex flex-col">
//             <div className="text-sm md:text-lg lg:text-xl text-black font-semibold">
//               Delivering to - <span className="text-blue-600">507303</span>
//             </div>
//             <div className="text-sm md:text-lg lg:text-xl text-black truncate max-w-[250px] md:max-w-none">
//               A/6-302, Maple Oasis, Karamsad, Anand
//             </div>
//           </div>
//         </div>
//         {/* Change Button */}
//         <button className="border px-4 py-2 rounded-lg bg-orange-400 bg-opacity-40 text-sm md:text-lg lg:text-xl font-semibold">
//           Change
//         </button>
//       </div>
//     </div>
//   );
// }

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
