"use client"
import React from "react";

interface Store {
  name: string;
  description: string;
  location: string;
  fssai: string;
  rating: number;
  reviews: number;
  startingPrice: number;
}

interface StoreDetailProps {
  store: Store;
}

const StoreDetailCard: React.FC<StoreDetailProps> = ({ store }) => {

  return (
    <div className="bg-[#FFCB00] h-[310px] rounded-lg shadow-xl mx-auto">
      {/* Store Name and Description */}
      <div className="flex justify-between">
       <div className="px-[43px]">
        <div className="flex space-x-[42px]">
            <div className="hover:cursor-pointer"> 
            <img src="/Ellipse 52.svg" className="w-[120px] h-[120px] rounded-full mt-[15px] mb-[27px]"/> 
            </div>
            <div >
                <h2 className="font-inter text-4xl font-semibold leading-[43.57px] tracking-[0.02em] decoration-none mb-[32px] mt-[20px]">
                    {store.name}
                </h2>
                <p  className="font-inter text-2xl font-normal leading-[33.89px] tracking-[0.02em] decoration-none">
                {store.description}
                </p>
            </div>
        </div>
        <div>
         <div className="flex gap-[29px]">
            <div className="border-[1px] p-[10px] rounded-[10px] flex items-center justify-center border-black font-inter text-[26px] font-medium leading-[31.47px] tracking-[0.02em] text-center decoration-skip-ink-none decoration-from-font">
            {store.location}
            </div>
            <div className="border-[1px] p-[10px] rounded-[10px] flex items-center justify-center border-black font-inter text-[26px] font-semibold leading-[31.47px] tracking-[0.02em] text-center decoration-skip-ink-none decoration-from-font">Fssai no :
            {store.fssai}
            </div>
         </div>
         <div className="mr-[27px] flex mt-[32px] w-[198px] h-[32px] gap-[27px] mb-[33px]">
            <div className="pb-[2px] flex items-center">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.75" d="M24.3035 1.7069C24.0814 1.48224 23.8169 1.30402 23.5252 1.18262C23.2336 1.06122 22.9207 0.999057 22.6048 0.999762H16.0194C15.5874 1.00057 15.1731 1.17169 14.8665 1.47601L1.70151 14.6383C1.25229 15.0885 1 15.6984 1 16.3344C1 16.9703 1.25229 17.5803 1.70151 18.0304L7.96928 24.2982C8.41954 24.7476 9.02971 25 9.66587 25C10.302 25 10.9122 24.7476 11.3625 24.2982L24.5221 11.1412C24.827 10.8351 24.9988 10.421 25 9.98893V3.39973C25.0019 3.08548 24.9413 2.77398 24.8218 2.48336C24.7022 2.19274 24.5261 1.9288 24.3035 1.7069ZM19.8572 7.85682C19.5181 7.85682 19.1867 7.75628 18.9048 7.56791C18.6229 7.37954 18.4031 7.11181 18.2734 6.79857C18.1436 6.48533 18.1097 6.14065 18.1758 5.80812C18.242 5.47558 18.4053 5.17013 18.645 4.93038C18.8847 4.69064 19.1902 4.52737 19.5227 4.46123C19.8553 4.39508 20.1999 4.42903 20.5132 4.55878C20.8264 4.68853 21.0942 4.90825 21.2825 5.19016C21.4709 5.47207 21.5714 5.8035 21.5714 6.14255C21.5714 6.5972 21.3908 7.03323 21.0693 7.35472C20.7478 7.67621 20.3118 7.85682 19.8572 7.85682Z" stroke="#0061F2" strokeWidth="1.5"/>
            </svg>
             <span className="w-[166px] h-[30px] ml-[8px] font-poppins text-[20px] font-medium leading-[30px] text-left decoration-skip-ink-none decoration-from-font">Start from ${store.startingPrice}</span>
            </div>
            <div className="w-[135px] h-[30px] flex gap-[8px]">
            <div>
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.75">
            <path d="M10.4815 16.148L14.037 17.3332C14.037 17.3332 22.9259 15.5554 24.1111 15.5554C25.2963 15.5554 25.2963 16.7406 24.1111 17.9258C22.9259 19.111 18.7778 22.6665 15.2222 22.6665C11.6667 22.6665 9.2963 20.8888 6.92593 20.8888H1" stroke="#0061F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 13.7777C2.18519 12.5925 4.55556 10.8147 6.92593 10.8147C9.2963 10.8147 14.9259 13.1851 15.8148 14.3703C16.7037 15.5555 14.037 17.3333 14.037 17.3333M8.11111 7.25918V2.51844C8.11111 2.20411 8.23598 1.90265 8.45824 1.68038C8.68051 1.45812 8.98197 1.33325 9.2963 1.33325H23.5185C23.8328 1.33325 24.1343 1.45812 24.3566 1.68038C24.5788 1.90265 24.7037 2.20411 24.7037 2.51844V11.9999" stroke="#0061F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.4453 1.33325H19.3712V6.66659H13.4453V1.33325Z" stroke="#0061F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            </svg>
            </div>
            <span className="w-[103px] h-[30px] font-poppins text-[20px] font-medium leading-[30px] text-left decoration-skip-ink-none decoration-from-font">best seller</span>
            </div>
         </div>
      </div>
      </div>
      <div className="py-[24px] mr-[76px]">
        <div className="flex space-x-[57px] mb-[132px]">
        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full mt-[6px] hover:cursor-pointer">
          <img src="/iconoir_heart.svg" alt="heart" className="w-full h-full"/>
        </div>
        <div className="w-[195px] h-[51px] flex items-center justify-center bg-[#FFE1CE] rounded-[30px] gap-[10px] hover:cursor-pointer">
            <div className="w-[32px] h-[32px]">
             <img src="/Star 4.svg" alt="start" />
            </div>
            <span className="font-inter text-2xl font-semibold leading-[31.47px] tracking-[0.02em] items-center decoration-solid decoration-from-font">{store.rating}({store.reviews})</span>
        </div>
        </div>
        <div className="w-[157px] h-[56px] rounded-[16px] p-[15px] flex items-center justify-between border-[#FFE1CE] border-4 ml-[128px] hover:cursor-pointer">
            <span className="font-inter text-[26px] font-semibold leading-[31.47px] tracking-[0.02em] decoration-skip-ink-none decoration-from-font"> share </span>
            <div className="w-[32px] h-[32px]">
              <img src="/material-symbols_share.svg" alt="share" className="w-full h-full"/>
            </div>
        </div>
     </div>
     </div>
     
    </div>
  );
};

export default StoreDetailCard;