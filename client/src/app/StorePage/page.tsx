import React from 'react';
import StoreDetail from './StoreDetailCard';
import Heading from './Heading';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import { Product } from './ProductCard'

const mockStore = {
  name: "Avakaya Pickle Store",
  description: "non-pickles, veg pickle, sweets, snacks",
  location: "Narayanaguda, Hyderabad",
  fssai: "12203623737363",
  rating: 4.8,
  reviews: 2132,
  startingPrice: 299,
};

const mockProducts: Product[] = [
  {
    id: 1,
    storeName: "Andhra Pickle Store",
    productName: "Chicken Pickle (250 g)",
    currentPrice: 329,
    originalPrice: 749,
    discount: "30% OFF",
    imageUrl: "/Frame 1000006486.svg",
    rating: 4.8,
    reviews: 2132,
    isFavorite: false,
  },
  {
    id: 2,
    storeName: "Andhra Pickle Store",
    productName: "Mutton Pickle (250 g)",
    currentPrice: 399,
    originalPrice: 799,
    discount: "25% OFF",
    imageUrl: "/Frame 1000006486.svg",
    rating: 4.7,
    reviews: 1850,
    isFavorite: false,
  },
  {
    id: 3,
    storeName: "Andhra Pickle Store",
    productName: "Prawn Pickle (250 g)",
    currentPrice: 499,
    originalPrice: 899,
    discount: "40% OFF",
    imageUrl: "/Frame 1000006486.svg",
    rating: 4.9,
    reviews: 2201,
    isFavorite: false,
  },
];

export default function Store() {
  return (
    <div className='py-[125px] px-[54px] dark: bg-white text-black'>
      {/* Store Header Component with mock data */}
      <StoreDetail store={mockStore} />
      <Heading />
      <div className='flex'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

