import React from 'react';

export interface Product {
  id: number;
  storeName: string;
  productName: string;
  currentPrice: number;
  originalPrice: number;
  discount: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    storeName,
    productName,
    currentPrice,
    originalPrice,
    discount,
    imageUrl,
    rating,
    reviews,
    isFavorite,
  } = product;

  return (
    <div className="pb-[28px]">
      <div className="flex pt-[25px] h-[300px] shadow-2xl rounded-[12px] px-[45px]">
        <div>
          <img src={imageUrl} alt="pic" className="w-[250px] h-[250px] gap-0 rounded-[8px]" />
        </div>
        <div className="w-[300px] h-[228px] ml-[80px] p-1">
          <div className="w-full h-[27px] font-sans text-[22px] font-medium leading-[26.63px] tracking-[0.02em] mb-[21px]">
            {storeName}
          </div>
          <div className="w-full h-[31px] font-sans text-[26px] font-extrabold leading-[31.47px] tracking-[0.02em]">
            {productName}
          </div>
          <div className="flex items-center w-[276px] h-[38px] gap-[22px] mt-[26px]">
            <div className="w-[152px] h-[18px]">
              <span className="font-serif text-[36px] font-bold leading-[18px] text-left mr-[20px]">
                ₹{currentPrice}
              </span>
              <span className="font-serif text-[32px] font-normal leading-[18px] text-left line-through">
                ₹{originalPrice}
              </span>
            </div>
            <div className="w-[102px] h-[38px] rounded-tl-2xl rounded-br-2xl bg-[#D32F2F] p-[10px] ml-4">
              <span className="w-[82px] flex justify-center items-center h-[18px] text-white font-sans font-semibold leading-[18px]">
                {discount}
              </span>
            </div>
          </div>
          <button className="py-[11.5px] px-[75px] mt-[20px] w-[300px] h-[54px] bg-black text-white font-sans text-[26px] font-semibold leading-[31.47px] tracking-[0.02em] text-center gap-[10px] rounded-[4px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Add to Cart
          </button>
        </div>
        <div className="ml-auto">
          <div className="w-[195px] h-[51px] flex items-center justify-center bg-[#FFE1CE] rounded-[30px] gap-[10px] hover:cursor-pointer">
            <div className="w-[32px] h-[32px]">
              <svg
                width="32"
                height="30"
                viewBox="0 0 32 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0.5L19.5922 11.5557H31.2169L21.8123 18.3885L25.4046 29.4443L16 22.6115L6.59544 29.4443L10.1877 18.3885L0.783095 11.5557H12.4078L16 0.5Z"
                  fill="black"
                />
              </svg>
            </div>
            <span className="font-inter text-2xl font-semibold leading-[31.47px] tracking-[0.02em] items-center decoration-solid decoration-from-font">
              {rating} ({reviews})
            </span>
          </div>
          <div className="w-[26.67px] h-[24px] mt-[131px] ml-[122.67px] hover:cursor-pointer">
            <img
              src={isFavorite ? '/heart-filled.svg' : '/Vector(4).svg'}
              alt="heart"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
