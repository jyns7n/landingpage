import { colorLabel } from "@/lib/product-utils";
import type { Sku } from "@/lib/types";

interface SkuChipsProps {
  skus: Sku[];
  value: number;
  onChange: (skuId: number) => void;
}

export function SkuChips({ skus, value, onChange }: SkuChipsProps) {
  return (
    <div role="radiogroup" aria-label="Color" className="mt-[7px] flex flex-wrap justify-center gap-[6px] px-[16px]">
      {skus.map((sku) => {
        const active = sku.id === value;
        return (
          <button
            key={sku.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(sku.id)}
            className={`rounded-full border border-black px-[10px] py-[5px] text-[11px] font-medium uppercase leading-[16px] tracking-[0.5px] transition-colors lg:text-[12px] ${active ? "bg-black text-white" : "bg-transparent text-black hover:bg-black/10"}`}
          >
            {colorLabel(sku, "en")}
          </button>
        );
      })}
    </div>
  );
}
