"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton } from "./EmblaCarouselDotButton";
import { SlideType } from "@/types/carousel";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize"; // 👈 new hook

type Props = {
  slides: SlideType[];
};

export const EmblaCarousel: React.FC<Props> = ({ slides }) => {
  const { width: screenWidth } = useWindowSize(); // get screen width
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Responsive image size calculation
  const isMobile = screenWidth < 768;
  const imageWidth = Math.min(screenWidth, 1024); // limit max image size
  const imageHeight = isMobile
    ? Math.round((imageWidth * 3) / 4) // 4:3
    : Math.round((imageWidth * 9) / 16); // 16:9

  return (
    <div className="relative w-full overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div
            className="min-w-full flex-shrink-0 flex flex-col items-center justify-center text-center"
            key={index}
          >
            <div
                className="relative"
                style={{
                    width: `${imageWidth}px`,
                    height: `${imageHeight}px`,
                }}
                >
                <Image
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                    sizes={`${imageWidth}px`}
            />
            </div>


        {/* <div className="w-full max-w-[90vw] md:max-w-[calc(16/9*60vh)] p-4 bg-white shadow-md">
            <h2 className="text-lg font-bold">{slide.title}</h2>
            <p className="text-sm text-gray-600">{slide.description}</p>
        </div> */}
        </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
