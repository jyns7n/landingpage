export interface ColorLocalization {
  language_code: string;
  name: string;
}

export interface SkuColor {
  id: number;
  code: string;
  name: string;
  path: string | null;
  hex_code: string | null;
  localizations: ColorLocalization[];
}

export interface ProductImage {
  id: number;
  path: string;
  order: number;
}

export interface Sku {
  id: number;
  code: string;
  order: number;
  colors: SkuColor[];
  images: ProductImage[];
}

export interface Product {
  product: { id: number; code: string; model_name: string };
  localization: { description: string };
  frame_types: { code: string }[];
  selling_setting: { price: number; in_stock: number };
  skus: Sku[];
}

export interface ProductsResponse {
  success: boolean;
  message?: string;
  total: number;
  data: Product[];
}
