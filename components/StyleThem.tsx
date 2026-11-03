"use client";

import Image from "next/image";
import { useRef } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { STYLE_ITEMS } from "@/lib/style-items";
import type { Product } from "@/lib/types";
import { useProductModal } from "./ModalProvider";
import { SectionTitle } from "./SectionTitle";

export function StyleThem({ products }: { products: Product[] }) {
  const { open } = useProductModal();
  const strip = useRef<HTMLDivElement>(null);
  useDragScroll(strip);

  const byCode = new Map(products.map((p) => [p.product.code, p]));

  return (
    <section id="style" aria-label="How to style them" className="relative">
      <div className="relative z-10 mx-auto h-[101px] max-w-[1300px] px-[16px] lg:h-[223px] lg:px-[24px] min-[1440px]:px-0">
        <SectionTitle as="h2" size="section" lines={["HOW TO", "STYLE THEM"]} />
      </div>

      <div
        ref={strip}
        role="region"
        aria-label="Style looks"
        tabIndex={0}
        className="flex cursor-grab overflow-x-auto border-t border-black [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {STYLE_ITEMS.map((item) => {
          const product = byCode.get(item.productCode);
          return (
            <div key={item.id} className="relative h-[492px] w-[326px] shrink-0 select-none lg:h-[611px] lg:w-[405px]">
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
