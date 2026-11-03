export interface StyleItem {
  id: string;
  image: string;
  /** Product opened by the "+" button. Figma has no explicit mapping, so looks cycle through the 8 products. */
  productCode: string;
  alt: string;
}

const PRODUCT_CODES = [
  "ML2001D-6S",
  "ML2002D-6S",
  "ML2003D-6S",
  "ML2004D-6S",
  "ML2005D-6S",
  "ML2006D-6S",
  "ML2007D-6S",
  "ML2008D-6S",
] as const;

export const STYLE_ITEMS: StyleItem[] = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `look-${n}`,
    image: `/style/look-${n}.jpg`,
    productCode: PRODUCT_CODES[i % PRODUCT_CODES.length],
    alt: `OWNDAYS × MELLER styling ${i + 1}`,
  };
});
