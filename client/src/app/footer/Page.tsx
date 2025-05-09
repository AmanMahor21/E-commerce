import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useGetCategoriesQuery } from '@/services/api';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { FaWhatsapp } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';

export default function Page() {
  const { data: categories } = useGetCategoriesQuery({ limit: 5 });
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const filters = useSelector((state: any) => state.product);

  const handleItemClick = (id: number, name: string, slug: string) => {
    dispatch(setProductFilter({ ...filters, keyword: name }));
    if (pathname !== `/categories/${slug}`) {
      router.push(`/categories/${slug}`);
    }
  };
  return (
    <div className="bg-slate-800 w-full flex flex-col items-center text-white">
      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center px-6 py-10 md:py-20">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start md:w-2/5 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-6">Trendify</h1>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="flex gap-2 items-center mb-3 cursor-pointer group">
            {/* <Image src="/Watsup.svg" alt="WhatsApp" width={25} height={25} /> */}
            <FaWhatsapp className="w-6 h-6 group-hover:text-green-500" />
            <div className=" cursor-pointer">
              <p className="font-semibold text-lg">WhatsApp</p>
              <p>+1 202-918-2132</p>
            </div>
          </div>
          <div className="flex gap-2 group items-center cursor-pointer">
            <FaPhoneAlt className="w-5 h-5 group-hover:text-blue-500" />
            <div className=" cursor-pointer">
              <p className="font-semibold text-lg">Call Us</p>
              <p>+1 202-918-2132</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-6 cursor-pointer">Download App</h2>
        </div>

        {/* Right Section */}
        <div className=" flex-col hidden md:flex md:flex-row gap-10 mt-10 md:mt-0">
          {/* Most Popular Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 underline">Most Popular Categories</h3>
            <ul className="text-lg space-y-2">
              {categories?.data?.map((ele) => (
                <li
                  key={ele.categoryId}
                  className="hover:underline hover:text-slate-300 cursor-pointer"
                  onClick={() => handleItemClick(ele.categoryId, ele.name, ele.categorySlug)}
                >
                  {ele.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 underline">Customer Services</h3>
            <ul className="text-lg space-y-2 cursor-pointer">
              <li>About Us</li>
              <li>Terms & Conditions</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>E-waste Policy</li>
              <li>Cancellation & Return Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Line */}
      <div className="w-10/12 border-t border-blue-400"></div>

      {/* Copyright Text */}
      <p className="text-md md:text-lg font-medium py-6">
        © 2025 All rights reserved. Trendify Private Ltd.
      </p>
    </div>
  );
}
