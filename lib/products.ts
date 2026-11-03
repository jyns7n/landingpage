import { cacheLife } from "next/cache";
import type { Product, ProductsResponse } from "./types";

export const PRODUCTS_URL = "https://api-one-alpha-60.vercel.app/meller/products.json";

export class ProductsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProductsError";
  }
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(PRODUCTS_URL);
  if (!res.ok) throw new ProductsError(`Products API responded ${res.status}`);
  const body = (await res.json()) as ProductsResponse;
  if (!body.success || !Array.isArray(body.data) || body.data.length === 0) {
    throw new ProductsError("Products API returned no products");
  }
  return body.data;
}
