import { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BigSlides = () => {
  const sliderRef = useRef<Slider>(null);

  // Replace these with your actual image URLs
  const images = ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg', '/banner4.jpg', '/banner5.jpg'];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: false,
  };

  return (
    <div className="relative top-[120px] md:top-[70px] h-[60%] ">
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div key={index} className="">
            <div className=" bg-gray-900 w-full h-[20%] hover:bg-gray-400  cursor-pointer shadow-sm ">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="object-contain text-gray-800 mx-auto h-full "
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </Slider>

      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  );
};

export default BigSlides;
