"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { formatYen } from "@/lib/format";
import { colorLabel, imageUrl, sortedImages } from "@/lib/product-utils";
import type { Product } from "@/lib/types";
import { useProductModal } from "./ModalProvider";
import { Swatch } from "./Swatch";

const MAX_SWATCHES = 4;

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const { open } = useProductModal();
  const [skuId, setSkuId] = useState(product.skus[0].id);
  const sku = product.skus.find((s) => s.id === skuId) ?? product.skus[0];
  const name = product.product.model_name;
  const cover = sortedImages(sku)[0];
  const visible = product.skus.slice(0, MAX_SWATCHES);
  const overflow = product.skus.length - visible.length;

  return (
    <article className="relative h-[383px] w-full border-2 border-black bg-white lg:h-[452px] lg:w-[422px] lg:border-transparent lg:hover:border-black">
      <button
        type="button"
        aria-label={`View ${name}`}
        onClick={() => open(product, sku.id)}
        className="absolute inset-0 z-0 cursor-pointer"
      />

      <div className="pointer-events-none absolute left-[4.16%] right-[4.42%] top-[14.75px] aspect-[472/359] bg-card-bg">
        {cover && (
          <div className="absolute left-[6.36%] top-[21.31%] h-[57.38%] w-[87.29%] mix-blend-multiply">
            <Image
              src={imageUrl(cover.path)}
              alt={`${name} ${colorLabel(sku, "en")}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 400px, 80vw"
              className="object-contain"
            />
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-[4.16%] bottom-[8.37%] top-[73.12%] flex items-center justify-between">
        <div className="text-black">
          <p className="font-gt text-[44.58px] font-bold leading-[57px] tracking-[1.0543px] lg:text-[52.716px] lg:leading-[67.508px]">
            {name}
          </p>
          <p className="whitespace-nowrap text-[13.53px] leading-[18.555px] tracking-[0.6982px] lg:text-[16px] lg:leading-[21.944px]">
            {`${product.product.code} ${sku.code}`}
          </p>
        </div>

        <div className="flex flex-col items-end gap-[12.684px] lg:gap-[15px]">
          <div
            role="radiogroup"
            aria-label={`${name} colors`}
            className="pointer-events-auto relative z-10 flex items-center gap-[2.5px] lg:gap-[3px]"
          >
            {visible.map((s) => (
              <Swatch
                key={s.id}
                colors={s.colors}
                label={colorLabel(s, "en")}
                selected={s.id === sku.id}
                onSelect={() => setSkuId(s.id)}
              />
            ))}
            {overflow > 0 && <span className="px-1 text-[13px] font-medium">+{overflow}</span>}
          </div>
          <p className="whitespace-nowrap tracking-[0.8634px]">
            <span className="font-gt text-[23.467px] font-medium leading-[23px] lg:leading-[27.136px]">
              {formatYen(product.selling_setting.price)}
            </span>
            <span className="text-[15.815px] font-medium leading-[23px] lg:leading-[27.136px]">+tax</span>
          </p>
        </div>
      </div>
    </article>
  );
});
