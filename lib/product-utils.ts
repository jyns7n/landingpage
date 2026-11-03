import type { Product, ProductImage, Sku, SkuColor } from "./types";

const IMAGE_BASE = "https://storage.owndays.com/storage/";
const STORE_BASE = "https://www.owndays.com/jp/ja/products/";

export type SwatchStyle =
  | { kind: "solid"; hex: string }
  | { kind: "image"; url: string }
  | { kind: "split"; hexes: [string, string] };

export function imageUrl(path: string): string {
  return IMAGE_BASE + path;
}

export function isOutOfStock(p: Product): boolean {
  return p.selling_setting.in_stock === 0;
}

export function storeUrl(p: Product, sku: Sku): string {
  return `${STORE_BASE}${p.product.code}?sku=${sku.id}`;
}

export function sortedImages(sku: Sku): ProductImage[] {
  return [...sku.images].sort((a, b) => a.order - b.order);
}

export function swatchStyle(colors: SkuColor[]): SwatchStyle {
  const [first, second] = colors;
  if (second?.hex_code && first.hex_code) {
    return { kind: "split", hexes: [first.hex_code, second.hex_code] };
  }
  if (first.hex_code) return { kind: "solid", hex: first.hex_code };
  if (first.path) return { kind: "image", url: imageUrl(first.path) };
  return { kind: "solid", hex: "#cccccc" };
}

export function chipLabel(sku: Sku): string {
  return sku.code;
}

export function colorLabel(sku: Sku, lang: "ja" | "en"): string {
  return sku.colors
    .map((c) =>
      lang === "ja"
        ? c.name
        : (c.localizations.find((l) => l.language_code === "en")?.name ?? c.name),
    )
    .join(" × ");
}

export function frameLabel(p: Product): string {
  return (p.frame_types[0]?.code ?? "").toUpperCase();
}
