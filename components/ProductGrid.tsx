import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section
      id="products"
      aria-label="Products"
      className="mx-auto grid max-w-[1334px] grid-cols-1 justify-items-center gap-[17px] px-[17px] pb-[101px] pt-[80px] lg:grid-cols-3 lg:pb-[150px] lg:pt-[130px]"
    >
      {products.map((p, i) => (
        <ProductCard key={p.product.id} product={p} priority={i < 3} />
      ))}
    </section>
  );
}
