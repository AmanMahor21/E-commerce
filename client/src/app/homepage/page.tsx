'use client';
import CategoryPage from './TopCategories/topCategories';
import Festive from './Festive/page';
import Starting from './Starting/page';
import Carousel from './Carousel/page';
import FavoriteProduct from './Favproduct/page';
import Store from './StoreAll/page';
import Product from './Products/page';
import Footer from '../footer/Page';
import { useGetCategoriesQuery } from '@/services/api';
function Page() {
  const categoriesWithImages = [
    { name: 'Veg Pickles', image: '/VegPickle.svg' },
    { name: 'snacks', image: '/Snacks.svg' },
    { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
    { name: 'Veg Pickles', image: '/VegPickle.svg' },
    { name: 'snacks', image: '/Snacks.svg' },
    { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
    { name: 'Veg Pickles', image: '/VegPickle.svg' },
    { name: 'snacks', image: '/Snacks.svg' },
    { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
    { name: 'Veg Pickles', image: '/VegPickle.svg' },
    { name: 'snacks', image: '/Snacks.svg' },
    { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
  ];
  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className="w-full h-full bg-white mt-[96px] overflow-hidden">
      {/* HERO SECTION */}
      <div className="w-full h-full p-10 flex bg-gradient-to-b from-[#ffc75f] to-[#2b6d79]  justify-around  ">
        {/* <div className="w-full h-full p-10 flex bg-gradient-to-b from-[#FFCB00] to-[#FFFFFF]  justify-around  "> */}
        <div>
          <CategoryPage categories={categories?.data || []} />
          {/* <TopCategories categories={categoriesWithImages} /> */}
        </div>
        <div className="flex-col flex justify-around">
          <div>
            <Festive />
          </div>
          <div>
            <Starting />
          </div>
        </div>
      </div>

      {/* CAROUSEL SECTION */}
      <div className=" bg-white h-full flex items-center justify-center overflow-hidden">
        <Carousel />
      </div>

      {/* Favorite Product */}
      <div className="bg-white flex flex-col items-center justify-center w-full h-full mt-20  ">
        <FavoriteProduct />
      </div>

      {/* Products */}
      {/* <div className="bg-white flex flex-col items-center justify-center w-full h-full mt-20">
        <Product />
      </div> */}

      {/* Store List */}
      {/* <div className="bg-white flex flex-col items-center justify-center w-full h-full mt-20">
        <Store />
      </div> */}

      {/* Footer */}
      <div className=" mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default Page;
