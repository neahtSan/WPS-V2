"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton } from "./EmblaCarouselDotButton";
import { SlideType } from "@/types/carousel";
import Image from "next/image";

type Props = {
  slides: SlideType[];
};

export const EmblaCarousel: React.FC<Props> = ({ slides }) => {
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

  return (
    <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
        {slides.map((slide, index) => (
            <div
                className="min-w-full flex-shrink-0 flex flex-col items-center justify-center text-center"
                key={index}
                >
                <Image
                    src={slide.image}
                    width={800}
                    height={450}
                    alt={slide.title}
                    className="w-full h-auto max-w-lg object-cover"
                />
                <div className="w-full max-w-lg p-4 bg-white shadow-md">
                    <h2 className="text-lg font-bold">{slide.title}</h2>
                    <p className="text-sm text-gray-600">{slide.description}</p>
                </div>
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
