import { afterEach, describe, expect, test, vi } from "vitest";
import fixture from "../fixtures/products.json";

vi.mock("next/cache", () => ({ cacheLife: vi.fn() }));

import { getProducts, ProductsError } from "@/lib/products";

afterEach(() => vi.unstubAllGlobals());

const stubFetch = (res: Partial<Response> & { json?: () => Promise<unknown> }) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(res));

describe("getProducts", () => {
  test("returns the product list on success", async () => {
    stubFetch({ ok: true, json: async () => fixture });
    const products = await getProducts();
    expect(products).toHaveLength(3);
    expect(products[0].product.model_name).toBe("ADISA");
  });
  test("rejects with ProductsError on a non-ok response", async () => {
    stubFetch({ ok: false, status: 500 });
    await expect(getProducts()).rejects.toBeInstanceOf(ProductsError);
  });
  test("rejects with ProductsError when data is empty", async () => {
    stubFetch({ ok: true, json: async () => ({ success: true, data: [] }) });
    await expect(getProducts()).rejects.toBeInstanceOf(ProductsError);
  });
  test("rejects with ProductsError when success is false", async () => {
    stubFetch({ ok: true, json: async () => ({ success: false, data: fixture.data }) });
    await expect(getProducts()).rejects.toBeInstanceOf(ProductsError);
  });
});
