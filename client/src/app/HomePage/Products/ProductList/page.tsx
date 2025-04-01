import { useLazyGetFilterProductsQuery } from '@/services/api';
import Prodc from '../Prodc/page';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function page() {
  const [fetchProducts, { data, error, isLoading }] = useLazyGetFilterProductsQuery();
  const filters = useSelector((state: any) => state.product);
  const BASE_URL = process.env.BASE_URL;

  // Fetching veg products for homepage
  useEffect(() => {
    fetchProducts({ ...filters, keyword: 'watch' });
  }, []);
  return (
    <div>
      {/* <div className="justify-center flex items-center mt-10 gap-7 flex-wrap px-24">
        {data?.data.map((ele, ind) => {
          const imageUrl =
            ele?.image && ele?.image
              ? `${BASE_URL}?path=${ele.image}/&name=${encodeURIComponent(ele.image)}`
              : '/ProductCategory.svg';
          return (
            <div
              key={ind}
              className="flex flex-col items-center justify-between lg:items-start w-full sm:w-60 md:w-72 lg:w-80 xl:w-1/5 mt-10"
            >
              <img src={imageUrl} alt="" className="w-32 h-32 rounded-lg" />
              <div className="">{ele.name}</div>
            </div>
          );
        })}
      </div> */}
      <div className="justify-center flex flex-col items-center lg:items-start mt-10">
        <div className="text-[36px] font-[600]  text-black flex justify-start items-start w-11/12 pl-24">
          Veg Pickles
        </div>
        <div className="flex flex-wrap  justify-start items-center  pr-24 pl-24">
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          {/* <Prodc /> */}
        </div>
      </div>

      <div className="justify-center flex flex-col items-center lg:items-start mt-10">
        <div className="text-[36px] font-[600]  text-black flex justify-start items-start w-11/12 pl-24">
          Non-Veg Pickles
        </div>
        <div className="flex flex-wrap  justify-start items-center  pr-24 pl-24">
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
          <Prodc />
        </div>
      </div>
    </div>
  );
}
