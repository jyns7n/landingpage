"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { imageUrl } from "@/lib/product-utils";
import type { ProductImage } from "@/lib/types";

interface ImageCarouselProps {
  images: ProductImage[];
  label: string;
  /** Changing this value scrolls the carousel back to the first slide (e.g. the active SKU id). */
  resetKey: number;
}

/** Horizontal scroll-snap carousel: one centered slide with its neighbours peeking in. */
export function ImageCarousel({ images, label, resetKey }: ImageCarouselProps) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = 0;
  }, [resetKey]);

  return (
    <div
      ref={scroller}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} images`}
      tabIndex={0}
      className="flex snap-x snap-mandatory overflow-x-auto px-[calc(50%-126px)] [scrollbar-width:none] lg:px-[calc(50%-210.434px)] [&::-webkit-scrollbar]:hidden"
    >
      {images.map((img, i) => (
        <div
          key={img.id}
          className="relative -mr-[10px] h-[179px] w-[252px] shrink-0 snap-center last:mr-0 lg:h-[298px] lg:w-[420.868px]"
        >
          <Image
            src={imageUrl(img.path)}
            alt={`${label} ${i + 1}`}
            fill
            sizes="(min-width: 1024px) 421px, 252px"
            className="object-cover mix-blend-multiply"
          />
        </div>
      ))}
    </div>
  );
}
