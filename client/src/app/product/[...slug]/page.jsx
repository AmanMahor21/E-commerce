'use client';

import EmblaCarousel from '../ProductCarousel';
import ProductStore from '../ProductStore';
import ProductPolicy from '../ProductPolicy';
import ProductDetails from '../ProductDetails';
import ProductReview from '../ProductReview';
import { useGetProductByIdQuery } from '@/services/api';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const slides = [
  '/ProductImage.svg',
  '/FastivePongal.svg',
  '/Store.svg',
  '/Store.svg',
  '/ProductImage.svg',
  '/ProductImage.svg',
  '/ProductImage.svg',
  '/ProductImage.svg',
];

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = useParams();
  const slugArray = param.slug; // Type: string[]
  const id = slugArray[slugArray.length - 1]; // Last segment = ID
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  console.log(id, 'slugArray slugArray');
  console.log(product, 'product');
  console.log(pathname, 'pathname pathname');
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !product) {
    return <div>Error loading product details.</div>;
  }

  const productImages = product.productImage?.map((image) => `/${image.image}`) || [];

  return (
    <div className="mt-[96px] bg-white ">
      <div className=" w-11/12 flex flex-col justify-center items-center mx-auto">
        {/* Product Carousel  && Product Store Decryption*/}
        <div className="flex w-full  justify-center items-center bg-white">
          <div className="flex flex-col w-2/6">
            <div className="container mx-auto p-4">
              <EmblaCarousel slides={slides} />
            </div>
          </div>

          <div className="flex flex-col w-2/5 justify-start items-start ml-20 mt-6 ">
            <ProductStore product={product[0]} />
          </div>
        </div>

        {/* Product Policy */}
        <div className="w-11/12 h-full  flex justify-center gap-10 items-center bg-white mt-8">
          <ProductPolicy />
        </div>

        {/* Product Details */}
        <div className="w-10/12 p-10">
          <ProductDetails product={product} />
        </div>

        <div className="w-10/12 p-14 pt-0">
          <div className="text-[24px] font-bold text-black">Ratings and Reviews</div>

          <ProductReview productId={1139} />
        </div>
      </div>
    </div>
  );
}
