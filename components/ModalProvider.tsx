"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/types";

export interface ModalState {
  product: Product;
  skuId: number;
}

interface ModalApi {
  state: ModalState | null;
  open: (product: Product, skuId?: number) => void;
  close: () => void;
  setSku: (skuId: number) => void;
}

const ModalContext = createContext<ModalApi | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState | null>(null);

  const open = useCallback(
    (product: Product, skuId?: number) => setState({ product, skuId: skuId ?? product.skus[0].id }),
    [],
  );
  const close = useCallback(() => setState(null), []);
  const setSku = useCallback((skuId: number) => setState((s) => (s ? { ...s, skuId } : s)), []);

  const api = useMemo(() => ({ state, open, close, setSku }), [state, open, close, setSku]);
  return <ModalContext.Provider value={api}>{children}</ModalContext.Provider>;
}

export function useProductModal(): ModalApi {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useProductModal must be used inside <ModalProvider>");
  return ctx;
}
