import Image from "next/image";
import { NAV_ITEMS, SECONDARY_LINKS } from "./nav-items";

const STORE_URL = "https://www.owndays.com/jp/ja";

function Chevron() {
  return (
    <svg aria-hidden="true" width="9" height="15" viewBox="0 0 9 15" fill="none" className="lg:hidden">
      <path d="M1 1l6.5 6.5L1 14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-black font-favorit uppercase text-orange">
      <div className="flex flex-col lg:grid lg:grid-cols-[64.67%_1fr] lg:grid-rows-[320px_80px]">
        <nav
          aria-label="Footer"
          className="order-1 flex flex-col border-b-2 border-orange lg:col-start-1 lg:row-start-1 lg:mt-[69px] lg:gap-[20px] lg:self-start lg:border-b-0 lg:pl-[70px]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              id={item.label === "ABOUT" ? "about" : item.label === "STORES" ? "stores" : undefined}
              href={item.href}
              className="flex h-[58px] items-center justify-between border-t-2 border-orange px-[30px] text-[14px] font-bold leading-[20.095px] tracking-[0.7033px] lg:h-auto lg:border-t-0 lg:px-0 lg:text-[18px]"
            >
              {item.label}
              <Chevron />
            </a>
          ))}
        </nav>

        <div className="order-2 flex flex-col items-center border-b-2 border-orange px-[30px] py-[40px] lg:col-start-2 lg:row-start-1 lg:justify-center lg:border-b-0 lg:border-l lg:px-0 lg:py-0">
          <div className="flex w-full items-center justify-between lg:w-auto lg:flex-col lg:gap-[18px]">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[8px] text-[17px] font-medium leading-[20px] tracking-[0.7px] lg:text-[21px]"
            >
              <Image src="/brand/cart.svg" alt="" width={22} height={22} unoptimized />
              ONLINE STORE
            </a>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[8px] text-[12px] font-medium leading-[20px] tracking-[0.7px] lg:text-[14px]"
            >
              OWNDAYS.COM
              <Image src="/brand/external.svg" alt="" width={14} height={14} unoptimized />
            </a>
          </div>
        </div>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="order-4 px-[30px] pb-[30px] lg:col-start-1 lg:row-start-1 lg:mt-[227px] lg:self-start lg:px-0 lg:pb-0 lg:pl-[70px]"
        >
          <Image src="/brand/instagram.svg" alt="" width={24} height={24} unoptimized />
        </a>

        <ul className="order-3 flex flex-col gap-[4px] px-[30px] py-[30px] text-[12px] font-bold leading-[20px] tracking-[0.7px] lg:col-start-1 lg:row-start-2 lg:flex-row lg:items-center lg:gap-[40px] lg:border-t lg:border-orange lg:px-0 lg:py-0 lg:pl-[70px] lg:text-[13px]">
          {SECONDARY_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <p className="order-5 border-t-2 border-orange px-[16px] py-[38px] text-center text-[11px] leading-[20px] tracking-[0.7px] lg:col-start-2 lg:row-start-2 lg:flex lg:items-center lg:justify-end lg:border-t lg:px-0 lg:py-0 lg:pr-[64px] lg:text-[12px]">
          COPYRIGHT (C) OWNDAYS CO., LTD. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
