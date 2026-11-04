"use client";

import Image from "next/image";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { STYLE_ITEMS } from "@/lib/style-items";
import type { Product } from "@/lib/types";
import { useProductModal } from "./ModalProvider";
import { SectionTitle } from "./SectionTitle";

export function StyleThem({ products }: { products: Product[] }) {
  const { open } = useProductModal();

  const byCode = new Map(products.map((p) => [p.product.code, p]));

  return (
    <section id="style" aria-label="How to style them" className="relative">
      <div className="relative z-10 mx-auto h-[101px] max-w-[1300px] px-[16px] lg:h-[223px] lg:px-[24px] min-[1440px]:px-0">
        <SectionTitle as="h2" size="section" lines={["HOW TO", "STYLE THEM"]} />
      </div>

      <Swiper
        role="region"
        aria-label="Style looks"
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode
        grabCursor
        className="border-t border-black"
      >
        {STYLE_ITEMS.map((item) => {
          const product = byCode.get(item.productCode);
          return (
            <SwiperSlide key={item.id} className="relative h-[492px]! w-[326px]! select-none lg:h-[611px]! lg:w-[405px]!">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 405px, 326px"
                className="object-cover"
              />
              {product && (
                <button
                  type="button"
                  aria-label={`View ${product.product.model_name}`}
                  onClick={() => open(product)}
                  className="absolute bottom-0 right-0 flex size-[70px] items-center justify-center bg-orange transition-colors hover:bg-orange-dark focus-visible:bg-orange-dark"
                >
                  <Image src="/brand/plus.svg" alt="" width={47} height={47} unoptimized />
                </button>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
