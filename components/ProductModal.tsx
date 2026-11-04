"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { formatYen } from "@/lib/format";
import { frameLabel, isOutOfStock, sortedImages, storeUrl } from "@/lib/product-utils";
import { ImageCarousel } from "./ImageCarousel";
import { useProductModal, type ModalState } from "./ModalProvider";
import { OnlineStoreButton } from "./OnlineStoreButton";
import { SkuChips } from "./SkuChips";

const LEAVE_MS = 220;

export function ProductModal() {
  const { state } = useProductModal();
  if (!state) return null;
  return <ModalDialog key={state.product.product.id} state={state} />;
}

function ModalDialog({ state }: { state: ModalState }) {
  const { close, setSku } = useProductModal();
  const { product, skuId } = state;
  const sku = product.skus.find((s) => s.id === skuId) ?? product.skus[0];
  const name = product.product.model_name;

  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [leaving, setLeaving] = useState(false);

  useBodyScrollLock(true);
  useFocusTrap(panelRef);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  const requestClose = useCallback(() => {
    if (leaving) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return close();
    setLeaving(true);
  }, [leaving, close]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(close, LEAVE_MS);
    return () => clearTimeout(t);
  }, [leaving, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const outOfStock = isOutOfStock(product);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby={titleId} data-leaving={leaving} className="fixed inset-0 z-50">
      <div
        data-testid="modal-backdrop"
        onClick={requestClose}
        className="modal-backdrop absolute inset-0 bg-black/40 backdrop-blur-[6px]"
      />
      <div
        ref={panelRef}
        className="modal-panel absolute inset-[17px] flex flex-col overflow-y-auto rounded-[20px] bg-black lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[616px] lg:rounded-l-[30px] lg:rounded-r-none"
      >
        <div className="relative h-[335px] shrink-0 bg-panel lg:h-[499px] lg:rounded-tl-[20px]">
          <h2
            id={titleId}
            className="absolute left-[30px] top-0 z-10 font-gt text-[30px] font-bold leading-[80px] tracking-[1.2593px] text-orange lg:left-[27px] lg:text-[35.833px] lg:leading-[80.635px]"
          >
            {name}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={requestClose}
            className="absolute right-[15px] top-[15px] z-10 size-[42px]"
          >
            <Image src="/brand/cross.svg" alt="" width={42} height={42} unoptimized />
          </button>
          <div className="pt-[70px] lg:pt-[51px]">
            <ImageCarousel images={sortedImages(sku)} label={name} resetKey={sku.id} />
          </div>
          <SkuChips skus={product.skus} value={sku.id} onChange={setSku} />
        </div>

        <div className="flex-1 px-[30px] pb-[40px] pt-[64px] text-white lg:px-[61px] lg:pt-[79px]">
          <dl className="flex flex-col gap-[14px] text-[14px] font-medium leading-[19.872px] tracking-[0.6323px]">
            <Row label="P/No.">{`${product.product.code} ${sku.code}`}</Row>
            <Row label="TYPE">{frameLabel(product)}</Row>
            <Row label="PRICE">
              {formatYen(product.selling_setting.price)} <span className="text-[11px]">税込</span>
            </Row>
          </dl>
          <p className="mt-[23px] max-w-[494px] font-noto text-[14px] font-medium leading-[30px]">
            {product.localization.description}
          </p>
          <div className="mt-[30px] flex max-w-[494px] flex-col items-center gap-[10px]">
            <OnlineStoreButton href={storeUrl(product, sku)} disabled={outOfStock} />
            {!outOfStock && (
              <p className="font-noto text-[12px] font-medium leading-[30px]">OWNDAYSオンラインストアに移動します</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[95.75px_1fr]">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
