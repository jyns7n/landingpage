import { ErrorState } from "@/components/ErrorState";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ModalProvider } from "@/components/ModalProvider";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { StyleThem } from "@/components/StyleThem";
import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

export default async function Home() {
  let products: Product[] | null = null;
  try {
    products = await getProducts();
  } catch {
    products = null;
  }

  return (
    <ModalProvider>
      <Header />
      <main>
        <Hero />
        {products ? (
          <>
            <ProductGrid products={products} />
            <StyleThem products={products} />
          </>
        ) : (
          <ErrorState />
        )}
      </main>
      <Footer />
      <ProductModal />
    </ModalProvider>
  );
}
