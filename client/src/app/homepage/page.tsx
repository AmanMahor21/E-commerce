'use client';
import ShoppingPolicy from './ShoppingPolicy/page';
import Carousel from './Carousel/page';
import BannerCarousel from './Banner-carousel/Banner';
import FavoriteProduct from './Favproduct/page';
import Footer from '../footer/Page';
import MegaCategory from './Components/MegaCategoory';
import ShopByCategorySection from './Components/ShopByMajorCategory';
import BigSlides from './Components/BIgSlides';
function Page() {
  return (
    <div className="w-full h-full bg-white mt-[70px] lg:mt-[96px] overflow-hidden relative">
      <BigSlides />
      <div className="w-full flex  justify-around h-24 md:h-10 lg:h-12 ">
        <MegaCategory />
      </div>

      <ShoppingPolicy />
      {/* <div className="mx-7 my-8 lg:px-10 space-y-14"> */}
      <ShopByCategorySection />
      {/* </div> */}
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
      <div className=" mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default Page;
