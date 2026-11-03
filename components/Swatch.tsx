import type { CSSProperties } from "react";
import type { SkuColor } from "@/lib/types";
import { swatchStyle } from "@/lib/product-utils";

interface SwatchProps {
  colors: SkuColor[];
  selected: boolean;
  label: string;
  onSelect: () => void;
}

function isLight(hex: string): boolean {
  const n = parseInt(hex.replace("#", ""), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (r * 299 + g * 587 + b * 114) / 1000 > 215;
}

function dotStyle(colors: SkuColor[]): { style: CSSProperties; light: boolean } {
  const s = swatchStyle(colors);
  if (s.kind === "solid") return { style: { backgroundColor: s.hex }, light: isLight(s.hex) };
  if (s.kind === "image") {
    return { style: { backgroundImage: `url(/_next/image?url=${encodeURIComponent(s.url)}&w=96&q=75)`, backgroundSize: "cover" }, light: false };
  }
  return {
    style: { backgroundImage: `linear-gradient(135deg, ${s.hexes[0]} 50%, ${s.hexes[1]} 50%)` },
    light: s.hexes.every(isLight),
  };
}

/** Circular color swatch (38px desktop / 32px mobile) acting as a radio option. */
export function Swatch({ colors, selected, label, onSelect }: SwatchProps) {
  const { style, light } = dotStyle(colors);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      onClick={onSelect}
      className={`relative size-[9cqw] shrink-0 rounded-full border-[1.5px] ${selected ? "border-orange" : "border-transparent"}`}
    >
      <span
        data-swatch-dot
        style={style}
        className={`absolute inset-[1.1cqw] rounded-full ${light ? "shadow-[0_0_0_1px_#999]" : ""}`}
      />
    </button>
  );
}
