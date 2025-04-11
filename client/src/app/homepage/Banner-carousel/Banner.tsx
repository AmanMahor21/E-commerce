import { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = () => {
  const sliderRef = useRef<Slider>(null);

  // Replace these with your actual image URLs
  const images = ['/banner1.png', '/banner2.png', '/banner3.png', '/banner4.png', '/banner5.png'];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative mx-7 mt-8  px-4">
      {/* <div className="relative max-w-4xl mx-auto px-4"> */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2 focus:outline-none">
            <div className="p-5 bg-gray-300  hover:bg-gray-400  cursor-pointer rounded-md shadow-sm border">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="object-contain text-gray-400 mx-auto max-h-40 rounded-md"
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

export default ImageCarousel;
