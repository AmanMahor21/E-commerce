'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './Thumb';
import Image from 'next/image';

type PropType = {
  slides: string[]; // Array of image URLs
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  // Sync thumbnail and main carousel when a thumbnail is clicked
  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  // Update selected index when main carousel changes
  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);

    // Scroll thumbnail carousel to the selected index
    if (emblaThumbsApi) {
      emblaThumbsApi.scrollTo(index);
    }
  }, [emblaMainApi, emblaThumbsApi]);

  // Attach event listeners for main carousel
  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect(); // Initial selection
    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="space-y-4  flex flex-col items-center">
      {/* Main Carousel */}
      <div
        className="overflow-hidden rounded-lg shadow-lg h-[500px] w-[500px] bg-red-200 flex justify-center items-center"
        ref={emblaMainRef}
      >
        <div className="flex">
          {slides.map((src, index) => (
            <div
              key={index}
              className="flex-[0_0_100%]   flex justify-center items-center "
            >
              <Image
                src={src}
                width={800}
                height={800}
                alt={`Slide ${index}`}
                className="w-full h-auto object-contain rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="overflow-hidden flex justify-center" ref={emblaThumbsRef}>
        <div className="flex space-x-2">
          {slides.map((src, index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              imageSrc={src}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
