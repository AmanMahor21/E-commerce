'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Slide1 from './Slide1/page';
import Slide2 from './Slide2/page';
import Slide3 from './Slide3/page';
export default function Page() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dots, setDots] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    setDots([...Array(emblaApi.scrollSnapList().length).keys()]);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative ">
      {/* Carousel Wrapper */}
      {/* <div className="overflow-hidden w-[70vw] h-full"> */}
      {/* <div className="overflow-hidden w-[75vw] h-full"> */}
      <div className="overflow-hidden w-[75vw] md:w-[80vw] h-full" ref={emblaRef}>
        <div className="flex">
          {/* Use Slide Components */}
          <Slide1 />
          <Slide2 />
          <Slide3 />
          <Slide1 />
          <Slide2 />
          <Slide3 />
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 mb-4">
        {dots.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === selectedIndex ? 'bg-black' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
