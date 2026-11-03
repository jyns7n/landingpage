"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { NAV_ITEMS, SECONDARY_LINKS } from "./nav-items";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  useBodyScrollLock(true);

  useEffect(() => {
    const mq = window.matchMedia?.("(min-width: 1024px)");
    if (!mq) return;
    const onChange = (e: { matches: boolean }) => e.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <div
        className="absolute inset-[17px] rounded-[20px] bg-black px-[40px] pt-[78px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute right-[15px] top-[15px] size-[42px]"
        >
          <Image src="/brand/cross.svg" alt="" width={42} height={42} unoptimized />
        </button>
        <ul className="flex flex-col gap-[26px] font-favorit text-[18px] font-bold uppercase leading-[20px] tracking-[0.7033px] text-orange">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={onClose}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="mt-[60px] flex flex-col gap-[15px] font-favorit text-[12px] font-medium uppercase leading-[20px] tracking-[0.7px] text-orange">
          {SECONDARY_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
