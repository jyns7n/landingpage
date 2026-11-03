import { describe, expect, test } from "vitest";
import fixture from "../fixtures/products.json";
import type { Product } from "@/lib/types";
import {
  chipLabel,
  colorLabel,
  frameLabel,
  imageUrl,
  isOutOfStock,
  sortedImages,
  storeUrl,
  swatchStyle,
} from "@/lib/product-utils";

const products = fixture.data as unknown as Product[];
const byName = (n: string) => products.find((p) => p.product.model_name === n)!;
const adisa = byName("ADISA");
const chauen = byName("CHAUEN");
const kessie = byName("KESSIE");

describe("product utils", () => {
  test("imageUrl prepends the storage base", () => {
    expect(imageUrl("products/a.webp")).toBe(
      "https://storage.owndays.com/storage/products/a.webp",
    );
  });
  test("isOutOfStock is true only when in_stock === 0", () => {
    expect(isOutOfStock(chauen)).toBe(true);
    expect(isOutOfStock(adisa)).toBe(false);
  });
  test("storeUrl links product code and sku id", () => {
    expect(storeUrl(adisa, adisa.skus[0])).toBe(
      "https://www.owndays.com/jp/ja/products/ML2001D-6S?sku=9445",
    );
  });
  test("swatchStyle: solid for hex, image for pattern, split for two colors", () => {
    expect(swatchStyle(adisa.skus[0].colors)).toEqual({ kind: "solid", hex: "#000000" });
    const brown = swatchStyle(adisa.skus[1].colors);
    expect(brown.kind).toBe("image");
    expect(brown.kind === "image" && brown.url).toMatch(
      /^https:\/\/storage\.owndays\.com\/storage\/colors\//,
    );
    expect(swatchStyle(kessie.skus[3].colors)).toEqual({
      kind: "split",
      hexes: ["#000000", "#ef7f1c"],
    });
  });
  test("sortedImages orders by `order` without mutating", () => {
    const sku = { ...adisa.skus[0], images: [...adisa.skus[0].images].reverse() };
    expect(sortedImages(sku).map((i) => i.order)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("labels", () => {
    expect(frameLabel(adisa)).toBe("SQUARE");
    expect(chipLabel(adisa.skus[3])).toBe("C4");
    expect(colorLabel(adisa.skus[3], "en")).toBe("Clear Green");
    expect(colorLabel(adisa.skus[3], "ja")).toBe("クリアグリーン");
    expect(colorLabel(kessie.skus[3], "en")).toBe("Black × Orange");
  });
});
