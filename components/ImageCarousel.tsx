"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { imageUrl } from "@/lib/product-utils";
import type { ProductImage } from "@/lib/types";

interface ImageCarouselProps {
  images: ProductImage[];
  label: string;
  resetKey: number;
}

export function ImageCarousel({ images, label, resetKey }: ImageCarouselProps) {
  return (
    <Swiper
      key={resetKey}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} images`}
      slidesPerView="auto"
      centeredSlides
      spaceBetween={-10}
      grabCursor
      className="w-full"
    >
      {images.map((img, i) => (
        <SwiperSlide key={img.id} className="relative bg-panel h-[179px]! w-[252px]! lg:h-[298px]! lg:w-[420.868px]!">
          <Image
            src={imageUrl(img.path)}
            alt={`${label} ${i + 1}`}
            fill
            draggable={false}
            sizes="(min-width: 1024px) 421px, 252px"
            className="object-cover mix-blend-multiply"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
