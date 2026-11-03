import type { ElementType } from "react";

interface SectionTitleProps {
  lines: string[];
  as?: ElementType;
  /** `hero` = 110px display title, `section` = 160px (72px on mobile). */
  size?: "hero" | "section";
  className?: string;
}

const SIZE = {
  hero: "text-[70px] leading-[70px] lg:text-[110px] lg:leading-[110px]",
  section: "text-[72px] leading-[63px] lg:text-[160px] lg:leading-[140px]",
} as const;

/** Orange display type sitting on an offset black highlight bar (Figma "PRODUCTS" / "HOW TO STYLE THEM"). */
export function SectionTitle({ lines, as: Tag = "h2", size = "section", className = "" }: SectionTitleProps) {
  return (
    <Tag
      aria-label={lines.join(" ")}
      className={`flex flex-col items-start font-gt font-black uppercase text-orange ${SIZE[size]} ${className}`}
    >
      {lines.map((line) => (
        <span key={line} data-line aria-hidden="true" className="relative inline-block whitespace-nowrap">
          <span className="absolute inset-x-0 top-1/2 h-[0.705em] -translate-y-1/2 bg-black" />
          <span className="relative">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
