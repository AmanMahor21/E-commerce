// 'use client';
// import CategoryPage from './TopCategories/topCategories';
// import Festive from './Festive/page';
// import Starting from './Starting/page';
// import Carousel from './Carousel/page';
// import FavoriteProduct from './Favproduct/page';
// import Store from './StoreAll/page';
// import Product from './Products/page';
// import Footer from '../footer/Page';
// import { useGetCategoriesQuery } from '@/services/api';
// function Page() {
//   const categoriesWithImages = [
//     { name: 'Veg Pickles', image: '/VegPickle.svg' },
//     { name: 'snacks', image: '/Snacks.svg' },
//     { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
//     { name: 'Veg Pickles', image: '/VegPickle.svg' },
//     { name: 'snacks', image: '/Snacks.svg' },
//     { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
//     { name: 'Veg Pickles', image: '/VegPickle.svg' },
//     { name: 'snacks', image: '/Snacks.svg' },
//     { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
//     { name: 'Veg Pickles', image: '/VegPickle.svg' },
//     { name: 'snacks', image: '/Snacks.svg' },
//     { name: 'Non-Veg Pickles', image: '/NonVegPickle.svg' },
//   ];
//   const { data: categories } = useGetCategoriesQuery();

//   return (
//     <div className="w-full h-full bg-white mt-[96px] overflow-hidden">
//       {/* HERO SECTION */}
//       <div className="w-full h-full p-10 flex bg-gradient-to-b from-[#1387ced1] to-[#ecfcff]  justify-around  ">
//         {/* <div className="w-full h-full p-10 flex bg-gradient-to-b from-[#FFCB00] to-[#FFFFFF]  justify-around  "> */}
//         <div>
//           <CategoryPage categories={categories?.data || []} />
//           {/* <TopCategories categories={categoriesWithImages} /> */}
//         </div>
//         <div className="flex-col flex justify-around">
//           <div>
//             <Festive />
//           </div>
//           <div>
//             <Starting />
//           </div>
//         </div>
//       </div>

//       {/* CAROUSEL SECTION */}
//       <div className=" bg-white h-full flex items-center justify-center overflow-hidden">
//         <Carousel />
//       </div>

//       {/* Favorite Product */}
//       <div className="bg-white flex flex-col items-center justify-center w-full h-full mt-20  ">
//         <FavoriteProduct />
//       </div>

//       {/* Products */}
//       {/* <div className="bg-white flex flex-col items-center justify-center w-full h-full mt-20">
//         <Product />
//       </div> */}

//       {/* Store List */}
//       {/* <div className="bg-white flex flex-col items-center justify-center w-full h-full mt-20">
//         <Store />
//       </div> */}

//       {/* Footer */}
//       <div className=" mt-20">
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Page;

'use client';
import CategoryPage from './TopCategories/topCategories';
import ShoppingPolicy from './ShoppingPolicy/page';
import Starting from './Starting/page';
import Carousel from './Carousel/page';
import BannerCarousel from './Banner-carousel/Banner';
import FavoriteProduct from './Favproduct/page';
import Store from './StoreAll/page';
import Product from './Products/page';
import Footer from '../footer/Page';
import { useGetCategoriesQuery } from '@/services/api';
import MegaCategory from './Components/MegaCategoory';
import ShopByCategory from './Components/ShopByCategory';
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
  const { data: categories } = useGetCategoriesQuery({});

  return (
    <div className="w-full h-full bg-white mt-[96px] overflow-hidden relative">
      {/* HERO SECTION */}
      {/* <div className="absolute w-full top-40  h-full bg-no-repeat rotate-180 bg-[url('/shape-circle-2.png')] "></div> */}
      {/* <div className="w-full landingPage bg-black bg bg-cover bg-center  h-[calc(100vh-96px)] p-10 flex  justify-around  "> */}
      <div className="w-full landingPage bg-[url('/header-bg.jpeg')] bg bg-cover bg-center  h-[calc(100vh-96px)] p-10 flex  justify-around  ">
        {/* <CategoryList /> */}
        <MegaCategory />
        {/* <div>
          <CategoryPage categories={categories?.data || []} />
          <TopCategories categories={categoriesWithImages} />
        </div> */}
        {/* <div className="flex-col flex justify-around">
          <div>
            <Starting />
          </div>
        </div> */}
      </div>

      {/* <div> */}
      <ShoppingPolicy />
      <div className="mx-7 mt-8 lg:px-10 space-y-14">
        <ShopByCategory keyword={'luggage'} label={'Travel and luggage'} />
        <ShopByCategory keyword={'jewelry'} label={'Jewelry and accessories'} />
      </div>
      <div className="px-11">
        <BannerCarousel />
      </div>

      <div className=" bg-white h-full flex items-center justify-center overflow-hidden mt-8">
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
