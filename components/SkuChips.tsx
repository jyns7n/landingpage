import { colorLabel } from "@/lib/product-utils";
import type { Sku } from "@/lib/types";

interface SkuChipsProps {
  skus: Sku[];
  value: number;
  onChange: (skuId: number) => void;
}

export function SkuChips({ skus, value, onChange }: SkuChipsProps) {
  return (
    <div role="radiogroup" aria-label="Color" className="mt-[7px] flex flex-wrap justify-center gap-[4px] px-[12px] lg:gap-[6px] lg:px-[16px]">
      {skus.map((sku) => {
        const active = sku.id === value;
        return (
          <button
            key={sku.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(sku.id)}
            className={`rounded-full border border-black px-[8px] py-[4px] text-[9.5px] font-medium uppercase leading-[16px] tracking-[0.4px] transition-colors lg:px-[10px] lg:py-[5px] lg:text-[12px] lg:tracking-[0.5px] ${active ? "bg-black text-white" : "bg-transparent text-black hover:bg-black/10"}`}
          >
            {colorLabel(sku, "en")}
          </button>
        );
      })}
    </div>
  );
}
