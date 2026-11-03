import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section
      id="products"
      aria-label="Products"
      className="mx-auto grid max-w-[1300px] grid-cols-1 justify-items-center gap-[17px] px-[17px] pb-[150px] pt-[130px] lg:grid-cols-[repeat(3,422px)] lg:justify-center lg:px-0"
    >
      {products.map((p, i) => (
        <ProductCard key={p.product.id} product={p} priority={i < 3} />
      ))}
    </section>
  );
}
