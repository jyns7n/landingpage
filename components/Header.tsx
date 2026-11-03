"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS } from "./nav-items";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${scrolled ? "bg-orange" : ""}`}
    >
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-[16px] py-[23px] lg:px-0 lg:py-[25px]">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-[50px] lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[15.071px] uppercase leading-[20.095px] tracking-[0.7033px] text-white ${i === 0 ? "font-medium" : "font-bold"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-[24px] w-[20px] items-center lg:hidden"
        >
          <Image src="/brand/menu.svg" alt="" width={20} height={15} unoptimized />
        </button>
      </div>
      {open && <MobileMenu onClose={close} />}
    </header>
  );
}
